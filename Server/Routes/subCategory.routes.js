import { Router } from "express";
import auth from "../middleware/auth";
import { AddSubCategoryController, deleteSubCategoryController, getSubCategryController } from "../controllers/subCategoryController";
import { updateCategoryController } from "../controllers/category.controller";


const subCategoryRouter =Router()

subCategoryRouter.post("/Add-SubCategory",auth,AddSubCategoryController)
subCategoryRouter.get("/get-SubCategory",auth,getSubCategryController)
subCategoryRouter.put("/update-subCategory",auth,updateCategoryController)
subCategoryRouter.delete("/delete-subCategory",auth,deleteSubCategoryController)

export default subCategoryRouter