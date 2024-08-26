import { BrowserRouter, Route, Routes } from "react-router-dom";
import DeliveryManagement from "./DeliveryManagement/delivery";
import InventoryManagement from "./InventoryManagement/inventory";
import PaymentManagement from "./PaymentManagement/Payment";
import ReactReviews from "./ReactReviews/reactReviews";
import SupplierManagement from "./SupplierManagement/supplier";
import OrderManagement from "./OrderManagement/order";
import Layout from "./Shared/Layout";
import Dashboard from "./Dashboard/Dashboard";
import DashboardHome from './ReactReviews/dashboardHome'; // Adjust the import path if necessary
import DashboardGraph from './ReactReviews/dashboardGraph'; // Adjust the import path if necessary
import DashboardInquiry from './ReactReviews/dashboardInquiry'; // Adjust the import path if necessary
import ChatBot from './ReactReviews/chatBot'; // File path and name must match exactly
import ReplyPage from './ReactReviews/ReplyPage'; // Import the new ReplyPage component
import UserInquiry from './ReactReviews/userInquiry'; // Adjust the import path if necessary
import ToReview from './ReactReviews/toReview'; // Adjust the import path if necessary
import History from './ReactReviews/History'; // Adjust the import path if necessary
import DisplayReview from './ReactReviews/displayReview'; // Adjust the import path if necessary
import UpdateReview from './ReactReviews/updateReview'; // Adjusted path

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="reactReviews" element={<ReactReviews />} />
          <Route path="dashboardhome" element={<DashboardHome />} />
          <Route path="dashboardgraph" element={<DashboardGraph />} />
          <Route path="dashboardinquiry" element={<DashboardInquiry />} />
          <Route path="chatbot" element={<ChatBot />} />
          <Route path="/user-inquiry/:userId" element={<UserInquiry />} />
          <Route path="toreview" element={<ToReview />} />
          <Route path="/history" element={<History />} />
          <Route path="reply/:id" element={<ReplyPage />} />
          <Route path="display" element={<DisplayReview />} />
          <Route path="/update/:id" element={<UpdateReview />} />
          <Route path="inventorymanagement" element={<InventoryManagement />} />
          <Route path="suppliermanagement" element={<SupplierManagement />} />
          <Route path="ordermanagement" element={<OrderManagement />} />
          <Route path="paymentmanagement" element={<PaymentManagement />} />
          <Route path="deliverymanagement" element={<DeliveryManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
