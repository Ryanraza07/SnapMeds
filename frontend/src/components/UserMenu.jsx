import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import Dividor from './Dividor'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utls/Axios'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'

const UserMenu = ({close}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () =>{
         try {
            const response = await Axios({
                ...SummaryApi.logout
         })
         if(response.data.success){

          if(close){
              close()
          }
            
             dispatch(logout())
             localStorage.clear()
             toast.success(response.data.message)
             navigate("/")
         }
         } catch (error) {
           AxiosToastError(error)
         }
    }
    
    const user = useSelector((state)=> state.user)
  return (
      <div>
        <div className='grid gap-1'>
        <div className='font-semibold mx-1'>My Account</div>
        <div className='text-sm mx-1'>{(user.name || user.mobile)?.charAt(0).toUpperCase()+(user.name || user.mobile)?.slice(1)}</div>
        </div>
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
