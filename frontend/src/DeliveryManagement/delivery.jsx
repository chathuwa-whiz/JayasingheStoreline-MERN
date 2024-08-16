import React from 'react'
import SideNavbar from './Sidebar'
import { Outlet } from 'react-router'

export default function Delivery() {
  return (
    <div className='flex'>
        <SideNavbar />
        <div className='flex-grow'>
            <Outlet /> {/* This will render the child routes */}
        </div>
    </div>
  )
}
