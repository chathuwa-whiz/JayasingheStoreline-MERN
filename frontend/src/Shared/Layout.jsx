import React from 'react'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <div>
        <div>This is Header</div>

        <Outlet />  {/* This will render the child routes */}
        
        <div>This is Footer</div>
    </div>
  )
}
