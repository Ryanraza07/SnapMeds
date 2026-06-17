import subCategoryModel from "../models/subcategory.model";

export const AddSubCategoryController = async(request,response) =>{
      try{
        const [name,image,category] = request.body
        
        if(!name && !image && !category){
            return response.status(400).json({
                message:"Provide name,image,category",
                error: true,
                success: false
            })
        }

        const payload = {
            name,
            image,
            category
        }
      

        const createSubCategory = new subCategoryModel(payload)

        const save = await createSubCategory.save()

        return response.joson({
            message: " sub Category Created",
            data: save,
            success: true
        })



      }catch(error){
           return response.status(500).json({
            message: error.message || error,
            error : true,
            success : false
           })
      }
}

export const getSubCategryController = async (request,response)=>{
    try{
        const getSubCategory = await subCategoryModel.find().sort({createdAt : -1}).populate('category')
        return response.json({
            message : "Sub Category Data",
            data : getSubCategory,
            error: false,
            success: true
        })
    }catch(error){
          return response.status(500).json({
            message: error.message,
            success: false,
            error:true
          })
    }
}

export const updateSubCategoryController = async (request,response)=>{
    try {
        const [name,image,category,_id] = request.body
        const checksub = await subCategoryModel.findById(_id)

        if(!checksub){
            return response.status(400).json({
                message:"subcategory not found",
                error:true,
                success: false
            })
        }
        const updateSubCategory = await subCategoryModel.findByIdAndUpdate(_id,{
            name,
            image,
            category,
        })
        return response.json ({
            message: "Sub Category Updated Successfully",
            data :updateSubCategory,
            success: true,
            error: false

        })
        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const deleteSubCategoryController = async(request,response)=>{
    try {
        const {_id} = request.body

        const checksub = await subCategoryModel.findById(_id)

        if(!checksub){
            return response.status(400).json({
                message:"Sub Category not found",
                error : true,
                success: false 
            })
        }

        const deleteSubCategory = await subCategoryModel.findByIdAndDelete(_id)

            return response.json({
                message: "Deleted Successfully",
                data : deleteSubCategory,
                success: true,
                error: false
                 
            })
        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            success : false,
            error : true 
        })
        
    }
}