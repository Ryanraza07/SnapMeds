import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";


const footer = () => {
  return (
   <footer className='container  mx-auto p-4 text-center flex flex-col gap-4 '>
    <p>Made With Love in India ♥️</p>
    <div className='flex items-center gap-4 justify-center text-2xl '>
      <a href=''>
        <FaFacebook/>
      </a>
       <a href=''>
        <FaInstagram/>
      </a>
       <a href=''>
        <FaXTwitter />
      </a>
      <a href=''>
        <FaLinkedin />
      </a>
    </div>
   </footer>
  )
}

export default footer