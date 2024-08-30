import React from 'react';
import { Outlet } from 'react-router';
import Header from './Header';
import SideNavbar from './SideNavbar';

export default function Employee() {
  return (
    <div className='flex'>
        <SideNavbar />
        <div className='flex-grow'>
            <Header />
            <Outlet /> {/* This will render the child routes */}
        </div>
    </div>
  )
}

