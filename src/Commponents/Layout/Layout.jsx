import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import MobileNavgition from '../MobileNavgition/MobileNavgition';
export default function Layout() {
  return (
   <>
   <Navbar/>
   <div className='min-h-[100vh]'><Outlet/></div>
<Footer/>
   <MobileNavgition/>
   </>
  )
}
