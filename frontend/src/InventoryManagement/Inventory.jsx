import React from 'react'
import SideNavbar from './SideNavbar'
import { Outlet } from 'react-router'

export default function Inventory() {
  return (
    <div className='flex'>
        <SideNavbar />
        <div className='flex-grow'>
            <Outlet /> {/* This will render the child routes */}
        </div>
    </div>
  )
}
