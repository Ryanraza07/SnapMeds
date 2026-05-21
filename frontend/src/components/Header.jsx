import React from 'react'
import logo1 from '../assets/logo1.png'
import Search from './Search'
import { Link,Navigate,useNavigate } from 'react-router'
import { FaUserCircle } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";


const header = () => {
 

  const navigate = useNavigate();
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
           <button onClick={redirectToLoginPage}>
           Login
           </button>
           <button className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-4 py-2 rounded text-white'>
            <div className='animate-bounce'>
            <IoBagAdd size={25}/>

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