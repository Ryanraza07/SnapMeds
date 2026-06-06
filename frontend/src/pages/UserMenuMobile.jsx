import React from 'react'
import UserMenu from '../components/UserMenu'
import { IoIosCloseCircle } from "react-icons/io";


const UserMenuMobile = () => {
  

  return (
    <section className=' relative py-2 w-full h-full bg-white'>
         <button  className='text-neutral-800  absolute right-6 cursor-pointer' onClick={() => window.history.back()}><IoIosCloseCircle size={20}/></button>
         <div className='bg-white px-4 container mx-auto pb-3'>
           
        <UserMenu/>
        
        </div>
    </section>
  
  )
}

export default UserMenuMobile
