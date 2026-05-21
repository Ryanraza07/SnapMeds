import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utls/Axios";
import SummaryApi from "../common/SummaryApi";
import { Link, useLocation, useNavigate } from "react-router";
import AxiosToastError from "../utls/AxiosToastError";


const VerifyOtp = () => {
  const [data, setData] = useState(["","","","","",""]);
  const navigate = useNavigate();
  
  const inputRef = useRef([]);

  const validvalue = data.every(e1 => e1)
  
  const location = useLocation()


   console.log("location",location)


  useEffect(()=>{
    if(!location?.state?.email)
      navigate('/forgot-password')
  },[])

      const handleSubmit = async(e)=>{
        e.preventDefault()

        

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password_otp,
                data : {
                    otp:data.join(""),
                    email:location?.state?.email
                }

            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData(["","","","","",""])
                navigate("/reset-password",{
                  state:{
                    data:response.data,
                    email:location?.state?.email
                  }
                })
            }

        } catch (error) {
            AxiosToastError(error)
        }



    }


 

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-6 shadow-md">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <p className="text-2xl font-semibold">Enter Otp</p>
         
        </div>

        {/* Form */}
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-1 text-neutral-700 ">
            <label htmlFor="otp">OTP</label>
            <div className="flex gap-1 justify-between">
                {
                    data.map((element,index)=>{
                       return(
                        <input
                         key={"otp"+index}       
                         type="text"
                         id={"otp"+index}
                          ref={(el) => inputRef.current[index] = el}
                value={data[index]}
                
                maxLength={1}
                onChange={(e) =>{
                   
                    const value = e.target.value
                    const newData = [...data]
                    newData[index] = value
                    setData(newData)
                    
                   
                    if (value && index < 5 && inputRef.current[index + 1]) {
                    inputRef.current[index + 1].focus();
                  }
                }}
                onKeyDown={(e) => {
            
                  if (e.key === 'Backspace' && !data[index] && index > 0) {
                    inputRef.current[index - 1].focus();
                  }
                }}
                className="w-14 py-2 border bg-blue-50 outline-none  focus-within:border-green-500 text-center font-semibold"
              />
                       ) 
                    })
                }
            </div>
          
          </div>

          

          {/* Submit Button */}
          <button disabled ={!validvalue} className={ `  ${validvalue ? "bg-green-800 hover:bg-green-600" : "bg-gray-500"}  text-white py-2 rounded mt-4`}>
            Verify OTP
          </button>
        </form>
        <p>
           Already have account? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
        </p>
      </div>
    </section>
  );
};

export default VerifyOtp;
