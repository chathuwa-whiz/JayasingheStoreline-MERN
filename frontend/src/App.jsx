import { BrowserRouter, Route, Routes } from "react-router-dom";
import DeliveryManagement from "./DeliveryManagement/delivery";
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
          <Route path="deliverymanagement" element={<DeliveryManagement />} />
        </Route>

        {/* Inventory Manager Routes */}
        <Route path="inventory" element={<Inventory />}>
          <Route index element={<InventoryDashboard />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;