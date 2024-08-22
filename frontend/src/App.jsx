import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaymentManagement from "./PaymentManagement/Payment";
import ReactReviews from "./ReactReviews/reactReviews";
import Layout from "./Shared/Layout";
import MainDashboard from "./Dashboard/Dashboard";

// inventory
import InventoryDashboard from "./InventoryManagement/Dashboard";
import Inventory from "./InventoryManagement/Inventory";
import Products from "./InventoryManagement/Products";

// Delivery
import DriverVehicleDetails from "./DeliveryManagement/DriverVehicleDetails";
import DeliveryDashboard from "./DeliveryManagement/Dashboard";
import Delivery from "./DeliveryManagement/delivery";

// Order
import Order from "./OrderManagement/order";
import OrderDashboard from "./OrderManagement/Dashboard";

// supplier
import Supplier from "./SupplierManagement/supplier";
import SupplierDashboard from "./SupplierManagement/Dashboard";
import SupplierDetailsForm from "./SupplierManagement/SuppliyerDetails";
import SupplierForm from "./SupplierManagement/suppliyerForm";
import SupplierList from "./SupplierManagement/supplierList";
import SupplierUpdate from "./SupplierManagement/supplierUpdate";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainDashboard />} />
          <Route path="reactreviews" element={<ReactReviews />} />
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
          <Route path="drivervehicledetails" element={<DriverVehicleDetails />} />
        </Route>

        {/* Order Manager Routes */}
        <Route path="order" element={<Order />}>
          <Route index element={<OrderDashboard />} />
        </Route>

        {/* Supplier Routes */}
        <Route path="supplier" element={<Supplier />}>
          <Route index element={<SupplierDashboard />} />
          <Route path="supplierdetailsform" element={<SupplierDetailsForm />} />
          <Route path="supplierform" element={<SupplierForm />} />
          <Route path="supplierlist" element={<SupplierList />} />
          <Route path="supplierupdate" element={<SupplierUpdate />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;