import React from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import { setUserDetails } from './store/userSlice'
import './App.css'
import { useEffect } from 'react'
import fetchUserDetails from './utls/fetchUserDetails'
import {useDispatch} from 'react-redux'

function App() {

   const dispatch = useDispatch()

  const fetchUser = async() => {
    const userData = await fetchUserDetails()
    console.log("userData",userData.data)
    dispatch(setUserDetails(userData.data))
  }
  
  useEffect(()=>{
   fetchUser()
  },[])

  return (
    <>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
      <Toaster/>

    </>
  )
}

export default App
