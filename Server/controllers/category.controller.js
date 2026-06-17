import categoryModel from "../models/category.model.js";
import productModel from "../models/product.model.js";
import subCategoryModel from "../models/subcategory.model.js";


export async function AddCategoryController(request,response) {
    
    try {
        const {name,image} = request.body

        if(!name || !image){
            return response.status(400).json({
                message:"Enter required Feild",
                error: true,
                success:false
            } )}

        const addCategory = new categoryModel({
            name,
            image
        })

        const saveCategory =  await addCategory.save()

        if(!saveCategory){
            return response.status(500).json({
                message:"Not Created",
                success:false,
                error:true
            })
        }
        
        return response.json({
            message:"Add Category",
            data: saveCategory,
            success:true,
            error: false
        })
        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error:true,
            success: false
        })
    }
}

export async function getCategoryController(request,response) {
    try {
        const data = await categoryModel.find().sort({ createdAt : -1 })

        return response.json({
            data:data,
            success:true,
            error:false
        })
    } catch (error) {
        return response.status(500).json({
            message:error.message || error,
            success:false,
            error:true

        })
    }
}

export async function updateCategoryController(request,response) {
    try {
        const {_id , name , image} = request.body
        const update = await categoryModel.updateOne({
            _id : _id
        },{
            name,
            image
        })

        return response.json({
            message:'Category Updated',
            success: true,
            error:false
        })
    } catch (error) {
        return response.status(500).json({
            message:error.message || error,
            success : false,
            error: true
        })
    }
}

export async function deleteCategoryController(request,response){
     try {
        const {_id} = request.body

        const checkSubCategory = await subCategoryModel.find({
            category:{
                "$in" : [ _id ]
            }
        }).countDocuments()

        const checkProduct = await productModel.find({
            category:{
                "$in" :[_id]
            }
        }).countDocuments()

        if(checkSubCategory >0  || checkProduct >0){
            return response.status(400).json({
                message:"Category is already in use Can't Delete it",
                error:true,
                success:false
            }) 
        }

        const deletecategory = await categoryModel.deleteOne({
            _id:_id
        })

        return response.json({
            message:"Category deleted successfully",
            data:deletecategory,
            success:true,
            error:false
        })
     } catch (error) {
        return response.status(500).json({
            message:error.message || error,
            success:false,
            error:true
        })
        
     }
}