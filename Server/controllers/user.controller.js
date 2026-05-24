import UserModel from "../models/user.model.js";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import sendEmail from "../Config/sendEmail.js";
import verifyEmailTemplate from "../utls/verifyEmailTemplate.js";
import generatedAcessToken from "../utls/generateAcessToken";
import generatedRefreshToken from "../utls/generatedRefreshToken.js";
import jwt from 'jsonwebtoken';
import uploadImageClodinary from "../utls/cloudinaryImageUpload.js";
import generateOtp from "../utls/genrateOtp.js";
import forgotPasswordTemplate from "../utls/forgotpasswordTemplate.js";

// controller for Register user

export async function registerUserController(request,response){
    try {

        const{ name, email , password } = request.body

        if(!name || !email || !password){
            return response.status(400).json({
                message:"provide email, name , password",
                error :true,
                success:false

            })
        }


        const user = await UserModel.findOne({email})

        if(user){
            return response.json({
                message:"Email is Already registered",
                error:true,
                success:false
            })
        }


        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const payload = {
            name,
            email,
            password:hashPassword
        }
         

        const newUser= UserModel(payload)
        const save = await newUser.save()

        const VerifyEmailUrl = `${process.env.FRONTENED_URL}/verify-email?code=${save?._id}`

 
        const verifyEmail = await sendEmail({
            sendTo:email,
            subject:"verify email from Snapmeds", 
            html: verifyEmailTemplate({
                name,
                url:VerifyEmailUrl
            })
        })

        return response.json({
            message:"user registered successfully",
            error:false,
            success:true

        })

        
    } catch (error) {
        return response.status(httpStatus.NOT_FOUND).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}




//controller for verifyEmail 


export async function verifyEmailController(request,response) {

    try {
        const { code } = request.body

        const user = await UserModel.findOne({_id : code})

        if(!user){
           return response.status(400).json({
            message:"Invalid code",
            error:true,
            success:false 
           })
        }

        const updateUser = await UserModel.updateOne({_id : code},{
            verify_email:true
        })

        return response.json({
            message:"verification of Email is sucessfull",
            error:false,
            success:true
        })
        
    } catch (error) {
        return response.status(500).json({
            message:error.message || error,
            error : true,
            success: false
        })
    }
    
}

// controller for login function


export async function loginUserController(request,response){
    try {
        const { email , password } = request.body


        if(!email || !password){
            return response.status(400).json({
                message : "provide email, password",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email })

        if(!user){
            return response.status(400).json({
                message : "User not register",
                error : true,
                success : false
            })
        }

        if(user.status !== "Active"){
            return response.status(400).json({
                message : "Contact to Admin",
                error : true,
                success : false
            })
        }

        const checkPassword = await bcrypt.compare(password,user.password)

        if(!checkPassword){
            return response.status(400).json({
                message : "Check your password",
                error : true,
                success : false
            })
        }

        const accesstoken = await generatedAcessToken(user._id)
        const refreshToken = await generatedRefreshToken(user._id)

        const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
            last_login_date : new Date()
        })

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        response.cookie('accessToken',accesstoken,cookiesOption)
        response.cookie('refreshToken',refreshToken,cookiesOption)

        return response.json({
            message : "Login successfully",
            error : false,
            success : true,
            data : {
                accesstoken,
                refreshToken
            }
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// controller for logout function

export async function logoutController(request,response) {
try {
    
        const userId = request.userId
    
        const cookiesOption = {
            httpOnly:true,
            secure:true,
            sameSite:"None"
        }
    
        response.clearCookie("accessToken",cookiesOption)
        response.clearCookie("refreshToken",cookiesOption)
    
        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId,{
            refresh_token:""
        })
        return response.json({
            message:"Logout successfully",
            error:false,
            success:true
        })
        
} catch (error) {

    return response.status(500).json({
        message:error.message || error,
        error:true,
        success:false
    })
}
    
}

//controller for avatar upload
export async  function uploadAvatar(request,response){
    try {
        const userId = request.userId // auth middlware
        const image = request.file  // multer middleware

        const upload = await uploadImageClodinary(image)
        
        const updateUser = await UserModel.findByIdAndUpdate(userId,{
            avatar : upload.url
        })

        return response.json({
            message : "upload profile",
            success : true,
            error : false,
            data : {
                _id : userId,
                avatar : upload.url
            }
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// controller for updating user details 
export async function updateUserDetails(request,response){
    try {
        const userId = request.userId //auth middleware
        const { name, email, mobile, password } = request.body 

        let hashPassword = ""

        if(password){
            const salt = await bcrypt.genSalt(10)
            hashPassword = await bcrypt.hash(password,salt)
        }

        const updateUser = await UserModel.updateOne({ _id : userId},{
            ...(name && { name : name }),
            ...(email && { email : email }),
            ...(mobile && { mobile : mobile }),
            ...(password && { password : hashPassword })
        })

        return response.json({
            message : "Updated successfully",
            error : false,
            success : true,
            data : updateUser
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// controller for forgot password 

export async function forgotPasswordController(request,response) {

    try {
        const { email } = request.body
        const user = await UserModel.findOne({email})

        if(!user){
            return response.status(400).json({
                message:"Email not available",
                error:true,
                success:false
            })
        }
       
        const otp = generateOtp()
        const expireTime = new Date()+60*60*1000

        const update = await UserModel.findByIdAndUpdate(user._id,{
            forgot_password_otp : otp,
            forgot_password_expiry:new Date(expireTime).toISOString()
        })

       

        await sendEmail({
            sendTo:email,
            subject:"Forgot password from SnapMeds",
            html:forgotPasswordTemplate({
                name:user.name,
                otp:otp
            })
        })

         return response.json({
            message:"check your email",
            error:false,
            success:true
        }) 
        




    } catch (error) {
        return response.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
        
    }
    
}

// controller to verify forgot password 

export async function verifyForgotPasswordController(request,response) {

    try {
        const{ email,otp } = request.body
      


        if(!email || !otp){
            return response.status(400).json({
                message:"Please provide all the required fields",
                error:true,
                success:false
            })
        }
 
        const user = await UserModel.findOne({email})

        if(!user){
            return response.status(400).json({
                  message:"Email not available",
                  error:true,
                  success:false
            })
        }

        const currentTime = new Date()

        if(user.forgot_password_expiry<currentTime){
            
            return response.status(400).json({
                message:"Otp is Expired",
                error:true,
                success:false
            }
            )
        }

      


        if(otp !== user.forgot_password_otp){
            return response.status(400).json({
                message:"Invalid Otp",
                error:true,
                success:false
            })
        
        }

        
          return response.json({
           message:"Otp Verification succesfull" ,
            error:false,
            success:true
        })


        

        
    } catch (error) {

        return response.status(500).json(
            {
                message:error.message || error,
                error:true,
                success:false
            }
        )
        
    }
    
}

// controller for reset the password

export async function resetPasswordController(request,response) {

    try {
        const {email,newPassword,confirmPassword} = request.body

        if(!email, !newPassword,!confirmPassword){
            return response.status(400).json({
                message :"provide all required feilds"
            })
        }
        
        const user = await UserModel.findOne({})
        
        if(!user){
            return response.status(400).json({
                message:"Email is not available",
                error:true,
                success:false
            })
        }
        
        if(newPassword !== confirmPassword){
            return response.status(400).json({
                message:"New password and Confirm password should be same",
                error:true,
                success:false
            })
        }
        

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(newPassword,salt)

        const update = await UserModel.findOneAndUpdate(user._id,{
            password:hashPassword
        })
        
        return response.status(200).json({
            message:"password updated successfully",
            error:false,
            success:true
        })

    } catch (error) {
        return response.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
    
}



//refresh token controler
export async function refreshToken(request,response){
    try {
        const refreshToken = request.cookies.refreshToken || request?.headers?.authorization?.split(" ")[1]  /// [ Bearer token]

        if(!refreshToken){
            return response.status(401).json({
                message : "Invalid token",
                error  : true,
                success : false
            })
        }

        const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)

        if(!verifyToken){
            return response.status(401).json({
                message : "token is expired",
                error : true,
                success : false
            })
        }

        const userId = verifyToken?._id

        const newAccessToken = await generatedAcessToken(userId)

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

        response.cookie('accessToken',newAccessToken,cookiesOption)

        return response.json({
            message : "New Access token generated",
            error : false,
            success : true,
            data : {
                accessToken : newAccessToken
            }
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// get login user details 

export async function userDetails(request,response) {
    try {
        const userId = request.userId

        const user = await UserModel.findById(userId).select('-password -refreshToken')

        return response.json({
            message:'user details',
            data:user,
            error:false,
            success:true
        })
    } catch (error) {
       return  response.status(500).json({
          message:'something went wrong',
          error:true,
          sucess:false 
       })
    }
}