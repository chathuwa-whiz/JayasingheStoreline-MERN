import React from 'react'
import SideNavbar from './SideNavbar'
import Dashboard from './Dashboard'

export default function InventoryDashboard() {
  return (
    <div className='flex'>
        <SideNavbar />
        <div className='flex-grow'>
            <Dashboard />
        </div>
    </div>
  )
}
