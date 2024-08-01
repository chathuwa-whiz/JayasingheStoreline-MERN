import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'
import Footer from './Footer'

export default function Layout() {
  return (
    <div>
        <Header />

        <Outlet />  {/* This will render the child routes */}
        
        <Footer />
    </div>
  )
}
