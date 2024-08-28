import React from 'react'
<<<<<<< HEAD

export default function Employee() {
=======
import SideNavbar from './SideNavbar'
import { Outlet, useLocation } from 'react-router'
import { DashboardHeader, ProductsHeader, ReportsHeader, StockHeader } from '../Shared/Header';

export default function Employee() {

  const location = useLocation();

  // Determine which header to display based on the current route
  let header;

  if(location.pathname === "/employee") {
    header = <DashboardHeader />
  } else if(location.pathname === "/inventory/products" || location.pathname === "/inventory/addproducts") {
    header = <ProductsHeader />
  } else if(location.pathname === "/inventory/stock") {
    header = <StockHeader />
  } else if(location.pathname === "/inventory/reports") {
    header = <ReportsHeader />
  } else{
    // header = <DefaultHeadre />
  }

>>>>>>> 21bd5211eb447e49ef3ce380028160ee4a3e21aa
  return (
    <div>
      Home
    </div>
  )
}

