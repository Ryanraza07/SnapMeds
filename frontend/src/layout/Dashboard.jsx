import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router'

const  Dashboard =() => {
  return (
    <section className='bg-white'>
      <div className='container mx-auto p-3 lg:grid grid-cols-[250px_1fr]'> 
      
      {/**left for menu */}
      <div className='py-4 sticky top-24 overflow-y-auto lg:block hidden'>
        <UserMenu/>
      </div>

    {/**right for content */}

    <div className=' p-4'>
      <Outlet/>
    </div>

      </div>
    </section>
    
  )
}

export default  Dashboard