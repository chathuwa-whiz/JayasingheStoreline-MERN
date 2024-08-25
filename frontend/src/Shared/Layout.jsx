import React from 'react'
import DefaultHeader, {HomeHeader, ProfileHeader, RegisterHeader} from './Header'
import { Outlet, useLocation } from 'react-router'
import Footer from './Footer'

export default function Layout() {

  const location = useLocation();

  // Determine which header to display based on the current route
  let header;

  if(location.pathname === "/") {
    header = <DefaultHeader />
  } else if(location.pathname === "/home") {
    header = <HomeHeader />
  } else if(location.pathname === "/profile") {
    header = <ProfileHeader />
  } else if(location.pathname === "/register" || location.pathname === "/customerlogin") {
    header = <RegisterHeader />
  } else {
    header = <RegisterHeader />
  }

  return (
    <div>
        {header}

        <Outlet />  {/* This will render the child routes */}
        
        <Footer />
    </div>
  )
}
