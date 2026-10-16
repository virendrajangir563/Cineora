import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
function CustomerLayout({user , onLogout}) {
  return (
    <div>
        <Navbar user={user} onLogout={onLogout} />
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default CustomerLayout