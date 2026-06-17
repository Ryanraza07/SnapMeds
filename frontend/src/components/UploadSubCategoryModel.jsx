import React, { useState } from 'react'
import { IoCloseCircleSharp } from 'react-icons/io5'
import uploadImage from '../utls/uploadImage'
import {useSelector} from 'react-redux'

const UploadSubCategoryModel = (close) => {

   
    const[subCategorydata,setsubCategoryData] = useState({
        name:"",
        image:"",
    })

    const handleRemoveCategorySelected = (categoryId)=>{
             const index = subCategorydata.category.findIndex(el => el._id === categoryId)
             subCategorydata.category.splice(index,1)
             setSubCategoryData((preve)=>{
                return{
                 ...preve
                }
             })
    }

    const handleUploadSubCategoryImage = async(e) =>{
        const file = e.target.files[0]

        if(!file){
            return
        }

        const response = await uploadImage(file)

        const {data : ImageResponse} = response

        setSubCategoryData((prev)=>{
            return {
                ...prev,
                image: ImageResponse.data.url 
            }
        })
    }

  return (
     <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800/60 flex items-center justify-center'>
            <div className='bg-white  max-w-4xl w-full p-4 rounded'>
                <div className='flex items-center justify-between w-full'>
                    <h1 className='font-semibold'>Upload a New Sub Category</h1>
                    <button onClick={close} className='w-fit block ml-auto cursor-pointer'><IoCloseCircleSharp size={25}/></button>
                </div>
                <form>
                    <div className= 'py-1 flex flex-col grid gap-1'>
                    <label>Name</label>
                        <input
                        type='text'
                        name='name'
                        placeholder='Enter Sub Category Name'
                        className='bg-blue-50 border border-green-400 w-full p-2 focus-within:border-green-600 outline-none rounded'
                        />
                     </div>

                  <div >
                    <p>Image</p>
                    <div className='flex flex-col grid gap-3'>
                        <div className='bg-blue-50 px-2 h-36 rounded w-full lg:w-36 border border-green-400 flex items-center justify-center '>
                           {
                            subCategorydata.image ? (
                                <img
                                src={subCategorydata.image}
                                alt='SubCategoryImage'
                                className='w-full h-full object-scale-down'


                                />
                            ):(
                                <p>No Image</p>
                            )
                           }

                        </div>
                        <div className='flex items-center justify-center grid gap-1'>
                              <label htmlFor='uploadSubCategoryImage'>
                                  <div className='px-4 py-1 border border-green-500 text-green-500 rounded hover:bg-green-700 hover:text-neutral-900 cursor-pointer  '>
                                      Upload Image
                                  </div>
                                  <input
                                      type='file'
                                      id='uploadSubCategoryImage'
                                      className='hidden'
                                      onChange={handleUploadSubCategoryImage}
                                  />
                              </label>
                        </div>
                        
                       <div className='border focus-within:border-green-600'>
                       
                          {/**diplay value**/}
                         

                        {/**select Category**/}
                        <select className='p-2'>
                            <option value={""}>
                                Select Category
                            </option>
                        </select>
                       </div>
                       

                    </div>
                </div>

                </form>
        </div>
    </section>
  )
}

export default UploadSubCategoryModel
