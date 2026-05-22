import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { RiEyeCloseFill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import toast from "react-hot-toast";
import Axios from "../utls/Axios";
import SummaryApi from "../common/SummaryApi";
import { Link } from "react-router";
import AxiosToastError from '../utls/AxiosToastError';
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
  
const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const validvalue = Object.values(data).every(e1 => e1)

      const handleSubmit = async(e)=>{
        e.preventDefault()

        if(data.newPassword !== data.confirmPassword){
            toast.error(
                "password and confirm password must be same"
            )
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.resetPasswordController,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData({
                    email : "",
                    newPassword : "",
                    confirmPassword : ""
                })
                navigate("/login")
            }

        } catch (error) {
            AxiosToastError(error)
        }



    }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-6 shadow-md">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <p className="text-2xl font-semibold">Choose a New Password</p> 
       
        </div>

        {/* Form */}
        <form className="grid gap-4" onSubmit={handleSubmit}>
         

          {/* Email Field */}
          <div className="grid gap-1 text-neutral-700">
            <label htmlFor="email">Email</label>
            <div className="flex border border-gray-300 rounded bg-blue-50 px-2 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                value={data.email}
                onChange={handleChange}
                className="w-full py-2 outline-none bg-blue-50"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="grid gap-1 text-neutral-700">
            <label htmlFor="password">Password</label>
            <div className="flex border border-gray-300 rounded bg-blue-50 px-2 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="newPassword"
                placeholder="Enter Your Password"
                value={data.newPassword}
                onChange={handleChange}
                className="w-full py-2 outline-none bg-blue-50"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer ml-2"
              >
                {showPassword ? <IoMdEye /> : <RiEyeCloseFill />}
              </div>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="grid gap-1 text-neutral-700">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="flex border border-gray-300 rounded bg-blue-50 px-2 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Your Password"
                value={data.confirmPassword}
                onChange={handleChange}
                className="w-full py-2 outline-none bg-blue-50"
              />
              <div
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="cursor-pointer ml-2"
              >
                {showConfirmPassword ? <IoMdEye /> : <RiEyeCloseFill />}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button disabled ={!validvalue} className={ `  ${validvalue ? "bg-green-800 hover:bg-green-600" : "bg-gray-500"}  text-white py-2 rounded mt-4`}>
            Change Password
          </button>
        </form>
        <p>
            Don't Want to Change? <Link to={"/login"} className="font-semibold text-green-800 hover:text-green-600" >Cancel</Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword
