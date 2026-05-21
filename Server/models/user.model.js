import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,"provide name"]
    },
    email:{
        type:String,
        required :[true,"provide email"],
        unique:true
    },
    password:{
        type :String,
        default: ""


    },
    avatar:{
        type:String,
        default:null
    },
    mobile:{
        type:Number,
        default:null
    },
    refresh_token:{
        type:String,
        default:""
    },
    verify_email:{
        type:String,
        default:false
    },
    last_login_date:{
        type :Date,
        default:""
    },
    status:{
        type:String,
        enum:["Active","Inactive","Suspended"],
        default:"Active"
    },
    
    address_details:[
        {
        type:mongoose.Schema.ObjectId,
        ref:'address'
        }
    ],
    shopping_cart:[
        {
        type:mongoose.Schema.ObjectId,
        ref:'cartProduct'
    }

],
order_history:[
        {
        type:mongoose.Schema.ObjectId,
        ref:'order'
    }

],
forgot_password_otp :{
    type:String,
    default:null
},
forgot_password_expiry:{
    type:String,
    default:""
},
role:{
    type:String,
    enum:["ADMIN","USER"],
    default:"USER" 
}


},{
    timestamps:true
}) 

const UserModel = mongoose.model("User",userSchema)

export default UserModel