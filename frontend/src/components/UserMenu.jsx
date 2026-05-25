import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import Dividor from './Dividor'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utls/Axios'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'

const UserMenu = () => {

    const dispatch = useDispatch()

    const handleLogout = async () =>{
         try {
            const response = await Axios({
                ...SummaryApi.logout
         })
         if(response.data.success){
             dispatch(logout())
             localStorage.clear()
             toast.success(response.data.message)
         }
         } catch (error) {
           AxiosToastError(error)
         }
    }
    
    const user = useSelector((state)=> state.user)
  return (
      <div>
        <div className='font-semibold'>My Account</div>
        <div className='text-sm'>{(user.name || user.mobile)?.charAt(0).toUpperCase()+(user.name || user.mobile)?.slice(1)}</div>
        <Dividor/>
        <div className='text-sm grid gap-2 cursor-pointer'> 
        <Link to ={""} className='px-2 hover:bg-orange-200 py-1'>My Orders</Link>
        <Link to = {""} className='px-2 hover:bg-orange-200 py-1'>Saved Adresses</Link>
        <button onClick={handleLogout} className='text-left bg-red-100 px-2 cursor-pointer hover:bg-red-200 py-1'>Log Out</button>
        </div>
    </div>
  )
}

export default UserMenu