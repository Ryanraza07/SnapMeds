import React, { useState } from "react";
import logo1 from "../assets/logo1.png";
import { RiEyeCloseFill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import toast from "react-hot-toast";
import Axios from "../utls/Axios";
import SummaryApi from "../common/SummaryApi";
import { Link, useNavigate } from "react-router";
import AxiosToastError from "../utls/AxiosToastError";
import fetchUserDetails from "../utls/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [data, setData] = useState({
    
    email: "",
    password: "",
    
  });

  const [showPassword, setShowPassword] = useState(false);

  const validvalue = Object.values(data).every(e1 => e1)

      const handleSubmit = async(e)=>{
        e.preventDefault()

        

        try {
            const response = await Axios({
                ...SummaryApi.login,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                localStorage.setItem('acesstoken',response.data.data.accesstoken)
                localStorage.setItem('refreshToken',response.data.data.refreshToken)

                const userDetails = await fetchUserDetails()
                dispatch(setUserDetails(userDetails.data))
                setData({
                   
                    email : "",
                    password : "",
                    
                })
                navigate("/")
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
          <p className="text-2xl font-semibold">Welcome to</p>
          <img src={logo1} width={140} height={60} alt="logo" />
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
                name="password"
                placeholder="Enter Your Password"
                value={data.password}
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
            <Link to = {"/forgot-password"} className= 'block ml-auto hover:text-green-600'>Forgot Password</Link>
          </div>

          

          {/* Submit Button */}
          <button disabled ={!validvalue} className={ `  ${validvalue ? "bg-green-800 hover:bg-green-600" : "bg-gray-500"}  text-white py-2 rounded mt-4`}>
            Login
          </button>
        </form>
        <p>
            Create a new Account? <Link to={"/register"} className="font-semibold text-green-800 hover:text-green-600" >Register</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
