import React from 'react'
import logo1 from '../assets/logo1.png'
import Search from './Search'
import { Link,Navigate,useLocation,useNavigate } from 'react-router'
import { FaUserCircle } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import UserMenu from './UserMenu';




const header = () => {
 
 const user = useSelector((state)=> state?.user) 
 const location = useLocation()
 const isSearchPage = location.pathname === "/search"
 const navigate = useNavigate();
 const [openUserMenu,setOpenUserMenu] = useState(false)



const redirectToRegister =() =>{
  navigate("/Register")
}
const redirectToLoginPage = () =>{
  navigate("/Login")
}



  return (
  <header className='h-auto lg:h-20 lg:shadow-md lg:flex items-center py-4 bg-white'>

   <div className='container flex mx-auto  lg:mt-0  items-center  px-2 justify-between'>
    <Link to={"/"} className='h-full  flex justify-center items-center'>
  <img 
      
          src = {logo1}
          width={200}
          height={60}
          alt='logo'
          className='hidden lg:block'
   />
   <img 
      
          src = {logo1}
          width={160}
          height={60}
          alt='logo'
          className='lg:hidden'
   />
    

    </Link>
    <div className='hidden lg:block'><Search/></div>


     <div>
       <button onClick={redirectToRegister} className='text-neutral-600 lg:hidden'  ><FaUserCircle size={40} /></button>
           <div className='hidden lg:flex items-center gap-10'>
            {
              user?._id ? (

                <div className='relative'>
                  <div onClick={() => setOpenUserMenu(preve => !preve)} className='flex items-center select-none gap-2 cursor-pointer'>
                    <p>Account</p>
                    {
                      openUserMenu?(
                        <TiArrowSortedUp  size={25}/>
                      ):(
                        <TiArrowSortedDown  size={25}/>

                      )
                    }
                  </div>

                  {
                    openUserMenu && (
                           <div className='absolute right-0 top-12'>
                     <div className='bg-white  rounded p-4  min-w-52 lg:shadow-lg'>
                     <UserMenu/>

                     </div>
                  </div>
                    )
                  }
                  
                </div>
              ): <button onClick={redirectToLoginPage}>
           Login
           </button>
            }
          
           <button className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-4 py-2 rounded text-white'>
            <div className='animate-bounce'>
            <FaCartPlus size={25}/>

            </div>
            <div className='font-semibold'>
              <p>1 Items</p>
              <p>Total price</p>
            </div>

           </button>
           
            </div>
          </div>
     </div>
     <div className='container mx-auto mt-2  px-2 lg:hidden'>
      <Search/>
     </div>


  
  
  
  </header>
  )
}

export default header