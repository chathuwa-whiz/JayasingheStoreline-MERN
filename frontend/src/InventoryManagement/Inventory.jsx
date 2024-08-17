import React from 'react'
import SideNavbar from './SideNavbar'
import { Outlet, useLocation } from 'react-router'
import { DashboardHeader, DefaultHeadre, ProductsHeader, ReportsHeader, StockHeader } from '../Shared/Header';

export default function Inventory() {

  const location = useLocation();

  // Determine which header to display based on the current route
  let header;

  if(location.pathname === "/inventory") {
    header = <DashboardHeader />
  } else if(location.pathname === "/inventory/products" || location.pathname === "/inventory/addproducts") {
    header = <ProductsHeader />
  } else if(location.pathname === "/inventory/stock") {
    header = <StockHeader />
  } else if(location.pathname === "/inventory/reports") {
    header = <ReportsHeader />
  } else{
    header = <DefaultHeadre />
  }

  return (
    <div className='flex'>
        <SideNavbar />
        <div className='flex-grow'>
            {header}
            <Outlet /> {/* This will render the child routes */}
        </div>
    </div>
  )
}
