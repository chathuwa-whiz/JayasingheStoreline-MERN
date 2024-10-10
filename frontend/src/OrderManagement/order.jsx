import React from 'react'
import Sidebar from '../OrderManagement/SideNavbar'
import { Outlet, useLocation } from 'react-router'

import { OrderHeader } from '../Shared/Header';
import { InquiryHeader,OrdersByProducts,OrderDashboard,OrderReportsHeader,OrdersSettingsHeader } from '../Shared/Header';

export default function order() {

  const location = useLocation();

  // Determine which header to display based on the current route
  let header;

  if(location.pathname === "/order/orderhistory") {
    header = <OrderHeader />
  } else if(location.pathname === "/order/orderinqiry") {
    header = <InquiryHeader />
  } else if(location.pathname === "/order/orderByProduct") {
    header = <OrdersByProducts />
  }else if(location.pathname === "/order") {
    header = <OrderDashboard />
  }else if(location.pathname === "/order/orderreport") {
    header = <OrderReportsHeader />
  }else if(location.pathname === "/order/orderSettings") {
    header = <OrdersSettingsHeader />
  }
  else{
    header = <></>
  }

  return (
    <div className='flex'>
        <Sidebar />
        <div className='flex-grow'>
        {/* {header} */}
            <Outlet />
        </div>
    </div>
  )
}
