import React, { useEffect, useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit'
import { setUserDetails } from '../store/userSlice'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utls/Axios'
import fetchUserDetails from '../utls/fetchUserDetails'
import AxiosToastError from '../utls/AxiosToastError'
import toast from 'react-hot-toast'


const Profile = () => {

const user = useSelector((state)=> state.user)
const [openProfileAvatarEdit,setProfileAvatarEdit] = useState(false)
const [userData,setUserData] = useState({
  name:user.name,
  email:user.email,
  mobile:user.mobile,
})
const[loading,setloading] = useState(false)
const dispatch = useDispatch()

useEffect(()=>{
  setUserData({
    name:user.name,
    email:user.email,
    mobile:user.mobile,
  })
},[user])

const handleOnChange = (e)=>{
  const {name,value} = e.target

  setUserData((preve)=>{
    return{
      ...preve,
      [name] : value
    }
  })

  
}

const handleSubmit = async(e)=>{
  e.preventDefault()
  
  try {
    setloading(true)
    const response = await Axios({
      ...SummaryApi.updateUserDetails,
      data:userData
    })

    const {data : responseData} =response

    if(responseData.success){
      toast.success(responseData.message)
      const userData = await fetchUserDetails()
      dispatch(setUserDetails(userData.data))
      console.log(userData)
    }
  } catch (error) {
    AxiosToastError(error)
  }finally{
    setloading(false)
  }

}



  return (
    <div className='p-4'>

      {/**profile picture upload */}
          <div className='w-20 h-20 flex justify-center items-center bg-red-500 rounded-full overflow-hidden'>{
            user.avatar ? (
              <img alt ={user.name}
               src={user.avatar}
               className='w-full h-full'
               />
            ):(
              <FaRegUserCircle size={60} />
            )}
          </div>
          <button onClick={() =>setProfileAvatarEdit(true)} className='text-sm border border-primary-100 min-w-20 mt-3 py-1 hover:border-primary-200 hover:bg-green-200 rounded-full'>Edit</button>
          {
            openProfileAvatarEdit && (
              <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)}/>
            )
          }

          {/**name mobile email and password change */}
          <form className='my-4 grid gap-4' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Name</label>
              <input 
              type = 'text'
              placeholder='Enter your name'
              className='p-2 bg-blue-50 outline-none border focus-within:border-green-200 rounded'
              value={userData.name}
              onChange={handleOnChange}
              name='name'
             
              required

              />
              

              
            </div>
            <div className='grid'>
              <label htmlFor='email'>Email</label>
              <input
              type = 'email'
              placeholder='Enter your Email'
              className='p-2 bg-blue-50 outline-none border focus-within:border-green-200 rounded'
              value={userData.email}
              onChange={handleOnChange}
              name='email'
              required

              />
            </div>
            <div className='grid'>
               <label htmlFor='mobile'> Mobile</label>
               <input
               type = 'text'
               id='mobile'
               name='mobile'
               placeholder='Enter Your Mobile'
               value={userData.mobile}
               onChange={handleOnChange}
               className='p-2 bg-blue-50 outline-none border focus-within:border-green-200 rounded'
               required
               />
            </div>
            <button className='bg-green-500 border px-4 py-2 font-semibold hover:bg-primary-100 border-primary-100 text-primary-200 hover:text-neutral-800 rounded '>
              {
                loading ? "Loading..." : "Submit"
              }
            </button>
          </form>
    </div>
  )
}

export default Profile
