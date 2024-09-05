import React from 'react'
import Sidebar from './SideNavbar'
import { Outlet } from 'react-router'

export default function Supplier() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-grow'>
        <Outlet />
      </div>
    </div>
  )
}
