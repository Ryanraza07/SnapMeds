import uploadImageClodinary from "../utls/cloudinaryImageUpload.js"

export default async function uploadImageController(request,response) {
    
    try {
        const file = request.file
        console.log(file)
        const uploadImage = await uploadImageClodinary(file)

        return response.status(200).json({
            message:"cloudinary upload done",
            data:uploadImage,
            success:'true',
            error:'false'
        })

    } catch (error) {
        return response.status(500).json({
            message:error.message || error,
            error : true,
            success: false
        })
    }
}