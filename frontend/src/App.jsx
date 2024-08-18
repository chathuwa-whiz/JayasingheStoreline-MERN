import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaymentManagement from "./PaymentManagement/Payment";
import ReactReviews from "./ReactReviews/reactReviews";
import SupplierManagement from "./SupplierManagement/supplier";
import OrderManagement from "./OrderManagement/order";
import Layout from "./Shared/Layout";
import MainDashboard from "./Dashboard/Dashboard";

// inventory
import InventoryDashboard from "./InventoryManagement/Dashboard";
import Inventory from "./InventoryManagement/Inventory";
import Products from "./InventoryManagement/Products";

//Delivery
import Delivery from "./DeliveryManagement/delivery";
import DeliveryDashboard from "./DeliveryManagement/Dashboard";
import DeliveryDetail from "./DeliveryManagement/DeliveryDetail";
import AddDelivery from "./DeliveryManagement/AddDelivery";
import DriverVehicleDetails from "./DeliveryManagement/DriverVehicleDetails";
import DeliveryNotification from "./DeliveryManagement/Notification";
import DeliveryReports from "./DeliveryManagement/Reports";
import DeliverySettings from "./DeliveryManagement/Settings";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainDashboard />} />
          <Route path="reactreviews" element={<ReactReviews />} />
          <Route path="suppliermanagement" element={<SupplierManagement />} />
          <Route path="ordermanagement" element={<OrderManagement />} />
          <Route path="paymentmanagement" element={<PaymentManagement />} />
        </Route>

        {/* Inventory Manager Routes */}
        <Route path="inventory" element={<Inventory />}>
          <Route index element={<InventoryDashboard />} />
          <Route path="products" element={<Products />} />
        </Route>
        {/*Delivery manager Routes */}
        <Route path="delivery" element={<Delivery />}>
          <Route index element={<DeliveryDashboard />} />
          <Route path="deliverydetail" element={<DeliveryDetail />} />
          <Route path="adddelivery" element={<AddDelivery />} />
          <Route path="drivervehicle" element={<DriverVehicleDetails />} />
          <Route path="notification" element={<DeliveryNotification />} />
          <Route path="reports" element={<DeliveryReports />} />
          <Route path="settings" element={<DeliverySettings />} />
          
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;