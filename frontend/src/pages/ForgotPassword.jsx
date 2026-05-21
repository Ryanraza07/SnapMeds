import React, { useState } from "react";

import { RiEyeCloseFill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import toast from "react-hot-toast";
import Axios from "../utls/Axios";
import SummaryApi from "../common/SummaryApi";
import { Link, useNavigate } from "react-router";
import AxiosToastError from "../utls/AxiosToastError";


const ForgotPassword = () => {
  const [data, setData] = useState({
    
    email: "",
   
    
  });

  

  const navigate = useNavigate()

  const validvalue = Object.values(data).every(e1 => e1)

      const handleSubmit = async(e)=>{
        e.preventDefault()

        

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                navigate("/Verify-otp", {
                    state : data
                })
                setData({
                   
                    email : "",
                    
                    
                })
               
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
          <p className="text-2xl font-semibold">Verify Email</p>
         
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

          

          {/* Submit Button */}
          <button disabled ={!validvalue} className={ `  ${validvalue ? "bg-green-800 hover:bg-green-600" : "bg-gray-500"}  text-white py-2 rounded mt-4`}>
            Get OTP
          </button>
        </form>
        <p>
           Already have account? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
