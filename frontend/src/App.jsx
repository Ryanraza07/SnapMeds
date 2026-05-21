import React from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';

import './App.css'

function App() {
  

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
