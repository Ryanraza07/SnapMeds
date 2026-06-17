import React, { useState } from 'react'
import { IoCloseCircleSharp } from "react-icons/io5";
import uploadImage from '../utls/uploadImage.js';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utls/AxiosToastError';
import Axios from '../utls/Axios.js';
import toast from 'react-hot-toast';



const UploadCategoryModel = ({close}) => {

    
        const [data,setData] = useState({
            name:"",
            image:""
        })
       
        const [loading,setloading] = useState(false)

         

        const handleOnChange = (e) =>{
            const { name , value} = e.target

            setData((prev) => ({
                ...prev,
                [name]:value
            }))
        }
     
        const handleSubmit = async(e) => {
            e.preventDefault()

            try {
                setloading(true)
                const response = await Axios({
                     ...SummaryApi.addCategory,
                     data:data
                })
                const {data:responseData}  = response
                if(responseData.success){
                    toast.success(responseData.message)
                    close()
                    
                }
            } catch (error) {
                AxiosToastError(error)
            }finally{
                setloading(false)
            }
        }

        const handleUploadCategoryImage = async(e) =>{
            const file = e.target.files[0]

            if(!file){
                return
            }
            const response = await uploadImage(file)
            console.log(response)
            const {data : ImageResponse} = response
           
            setData((prev)=>{
                return{
                    ...prev,
                    image:ImageResponse.data.url
                }
               
            })
            
        }

  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800/60 flex items-center justify-center'>
        <div className='bg-white  max-w-4xl w-full p-4 rounded'>
            <div className='flex items-center justify-between w-full'>
                <h1 className='font-semibold'>Upload a New Category</h1>
                <button onClick={close} className='w-fit block ml-auto cursor-pointer'><IoCloseCircleSharp size={25}/></button>
            </div>
            <form onSubmit={handleSubmit} className='my-3 grid gap-2'>
            <div className='grid gap-1'>
                <label id='categoryName' className='font-semibold'>
                    Name
                </label>
                <input
                type='text'
                id='categoryName'
                placeholder='Enter Category Name'
                value={data.name}
                name='name'
                onChange={handleOnChange}
                className='bg-blue-50 border-2 border-green-800 p-2 focus-within:border-green-800 outline-none rounded'
                
                />

               
            </div>
            <div>
                <p>Image</p>
                <div className='flex gap-4 flex-col lg:flex-row items-center'>
                    <div className='border-2 bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center outline-none border-green-800'>
                       {
                        data.image ? (
                            <img
                            src = {data.image}
                            alt='category'
                            className='w-full h-full object-scale-down'/>

                        ):(
                            <p className='text-sm tex-neutral-500'>No image</p>
                        )
                       } 
                       
                    </div>
                    <label htmlFor="uploadCategoryImage"><div disabled = {!data.name} className={`${!data.name ? "bg-gray-400 text-white cursor-not-allowed px-4 py-2":"bg-white border-2 hover:scale-105 active:scale-95 duration-150 border-green-500  px-4 py-2 cursor-pointer"}`}>Upload Image</div>
                    <input onChange={handleUploadCategoryImage} type='file' id='uploadCategoryImage' className='hidden' accept='image/*'/>
                    
                    </label>
                    </div>
                   <button className='bg-green-800 text-white w-full p-2 items-center my-2 cursor-pointer hover:scale-105 active:scale-95 duration-150' onClick={handleSubmit}>Add Category</button>
            </div>
        </form>
        </div>
        
    </section>
  )
}

export default UploadCategoryModel