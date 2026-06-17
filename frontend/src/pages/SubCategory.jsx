import React, { useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'





const SubCategory = () => {
 const [openAddSubCategory,setOpenAddSubCategory] = useState(false) 
  return (
    <section>
      <div className='font-semibold p-2 shadow-md flex item-center justify-between'>
        <h1>Sub Category</h1>
        <button onClick={()=>setOpenAddSubCategory(true)} className='bg-green-800 px-3 py-2 rounded  p-2 text-white text-sm hover:bg-green-700 '>Add SubCategory</button>
      </div>
      {
        openAddSubCategory && (
          <UploadSubCategoryModel/>
        )
      }
    </section>
  )
}

export default SubCategory