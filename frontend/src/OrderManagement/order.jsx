import React from 'react'
import Sidebar from '../OrderManagement/SideNavbar'
import { Outlet } from 'react-router'
import { OrderHeader } from '../Shared/Header'

export default function order() {
  return (
    <div className='flex'>
        <Sidebar />
        <div className='flex-grow'>
          {/*<OrderHeader/> */}
            <Outlet />
        </div>
    </div>
  )
}
