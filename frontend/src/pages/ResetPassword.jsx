import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

const ResetPassword = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const [data,setData] =useState({
    email: '',
    newPassword: "",
    confirmPassword: "",
  })
  
  useEffect(()=>{
    if(!(location?.state?.data?.success)){
        navigate("/forgot-password")
    }
  })
  


  return (
    <div>ResetPassword</div>
  )
}

export default ResetPassword