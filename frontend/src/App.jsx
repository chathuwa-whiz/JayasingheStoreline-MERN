import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaymentManagement from "./PaymentManagement/Payment";
import ReactReviews from "./ReactReviews/reactReviews";
import SupplierManagement from "./SupplierManagement/supplier";
import Layout from "./Shared/Layout";
import MainDashboard from "./Dashboard/Dashboard";

// inventory
import InventoryDashboard from "./InventoryManagement/Dashboard";
import Inventory from "./InventoryManagement/Inventory";
import Products from "./InventoryManagement/Products";
import AddProducts from "./InventoryManagement/AddProducts";
import UpdateProduct from "./InventoryManagement/UpdateProduct";

// Delivery
import DriverVehicleDetails from "./DeliveryManagement/DriverVehicleDetails";
import DeliveryDashboard from "./DeliveryManagement/Dashboard";
import Delivery from "./DeliveryManagement/delivery";

// Order
import Order from "./OrderManagement/order";
import OrderDashboard from "./OrderManagement/Dashboard";
import CategoryList from "./InventoryManagement/CategoryList";
import ProductsList from "./OrderManagement/ProductList";
import SingleProductView from "./OrderManagement/SingleProductView";
import Cart from "./OrderManagement/Cart";

//payment
import Payment from "./PaymentManagement/Payment";
import PaymentReport from "./PaymentManagement/paymentReport";
import CODdetails from "./PaymentManagement/CODdetails";
import Checkout from "./PaymentManagement/Checkout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainDashboard />} />
          <Route path="reactreviews" element={<ReactReviews />} />
          <Route path="suppliermanagement" element={<SupplierManagement />} />
          {/* <Route path="paymentmanagement" element={<PaymentManagement />} /> */}
        </Route>

        {/* Inventory Manager Routes */}
        <Route path="inventory" element={<Inventory />}>
          <Route index element={<InventoryDashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="addproducts" element={<AddProducts />} />
          <Route path="products/update/:_id" element={<UpdateProduct />} />
          <Route path="categories" element={<CategoryList />} />
        </Route>

        {/*Delivery manager Routes */}
        <Route path="delivery" element={<Delivery />}>
          <Route index element={<DeliveryDashboard />} />
          <Route path="drivervehicledetails" element={<DriverVehicleDetails />} />
        </Route>

        {/* Order Manager Routes */}
        <Route path="order" element={<Order />}>
          <Route index element={<OrderDashboard />} />
        <Route path="productlist" element={<ProductsList />} />
        <Route path="product/:_id" element={<SingleProductView />} />
        <Route path="cart" element={<Cart />} />
        </Route>

        {/* payment Manager Routes */}
        <Route path="payment" element={<Payment />} />
        <Route path="paymentReport" element={<PaymentReport />} />
        <Route path="coddetails" element={<CODdetails />} />
        <Route path="checkout" element={<Checkout />} />

      </Routes>

      
    </BrowserRouter>
  );
}

export default App;