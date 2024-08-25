import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import Stock from "./InventoryManagement/Stock";

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
import Shipping from "./OrderManagement/Shipping";
import PlaceOrder from "./OrderManagement/PlaceOrder";
import OrderHistory from "./OrderManagement/OrderHistory";
import OrderInquiries from "./OrderManagement/OrderInquiries";
import OrderByProducts from "./OrderManagement/OrderByProducts";

// Payement

import Reports from "./InventoryManagement/Reports";


//Customer
import CustomerLogin from "./CustomerManagemet/CusLogin"; 
import Register from "./CustomerManagemet/register";
import Home from "./CustomerManagemet/Home";
import Profile from "./CustomerManagemet/profile";

//payment
import PaymentReport from "./PaymentManagement/paymentReport";
import CODdetails from "./PaymentManagement/CODdetails";
import Checkout from "./PaymentManagement/Checkout";
import PaymentDashboard from "./PaymentManagement/PaymentDashboard";
import Payment from "./PaymentManagement/Payment";
import HrNotify from "./PaymentManagement/HrNotify";
import SupNotify from "./PaymentManagement/SupNotify";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<MainDashboard />} />
          <Route path="reactreviews" element={<ReactReviews />} />
          <Route path="suppliermanagement" element={<SupplierManagement />} />
          {/* <Route path="paymentmanagement" element={<PaymentManagement />} /> */}
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />

          {/* order manager part */}
          <Route path="productlist" element={<ProductsList />} />
          <Route path="product/:_id" element={<SingleProductView />} />
          <Route path="cart" element={<Cart />} />
          <Route path="shipping" element={<Shipping />} />
          <Route path="placeorder" element={<PlaceOrder />} />
        </Route>

        {/* Inventory Manager Routes */}
        <Route path="inventory" element={<Inventory />}>
          <Route index element={<InventoryDashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="addproducts" element={<AddProducts />} />
          <Route path="products/update/:_id" element={<UpdateProduct />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="stock" element={<Stock />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/*Delivery manager Routes */}
        <Route path="delivery" element={<Delivery />}>
          <Route index element={<DeliveryDashboard />} />
          <Route path="drivervehicledetails" element={<DriverVehicleDetails />} />
        </Route>

        {/* Order Manager Routes */}
        <Route path="order" element={<Order />}>
          <Route index element={<OrderDashboard />} />
          <Route path="orderhistory" element={<OrderHistory />} />
          <Route path="orderinqiry" element={<OrderInquiries/>} />
          <Route path="orderByProduct" element={<OrderByProducts/>} />
        </Route>        

        {/* Payment Manager Routes */}
        <Route path="checkout" element={<Checkout />} />
        <Route path="payment" element={<Payment />}>
          <Route index element={<PaymentDashboard />} />
          <Route path="paymentreport" element={<PaymentReport />} />
          <Route path="cod" element={<CODdetails />} />
          <Route path="hrnotify" element={<HrNotify />} />
          <Route path="supnotify" element={<SupNotify />} />
        </Route>

        
        {/* Customer Manager Routes */}
        <Route path="register" element={<Register />} />
        <Route path="customerlogin" element={<CustomerLogin />} />

      </Routes>

      
    </BrowserRouter>
  );
}

export default App;