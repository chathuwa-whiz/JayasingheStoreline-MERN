import React, { useState, useEffect } from "react";
import { FaBox, FaClock, FaCheck, FaExclamationCircle, FaMoneyBill, FaListUl, FaTrash, FaUser, FaTruck, FaCar, FaMotorcycle, FaBoxes } from 'react-icons/fa';

export default function DeliveryDashboard() {
  const [deliveries, setDeliveries] = useState([]);
  const [pendingDeliveries, setPendingDeliveries] = useState(0);
  const [completedDeliveries, setCompletedDeliveries] = useState(0);
  const [delayedDeliveries, setDelayedDeliveries] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalDeliveredItems, setTotalDeliveredItems] = useState(0);
  const [totalDrivers, setTotalDrivers] = useState(0);
  const [error, setError] = useState(null);

  // Price formatter for LKR
  const priceFormatter = new Intl.NumberFormat('en-LK', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const fetchDeliveries = async () => {
    try {
      const response = await fetch("/api/deliveries");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log(data);
      setDeliveries(data);
  
      const pending = data.filter(d => d.deliveryStatus === 'Pending').length;
      const completed = data.filter(d => d.deliveryStatus === 'Completed').length;
      const delayed = data.filter(d => d.deliveryStatus === 'Delayed').length;
  
      setPendingDeliveries(pending);
      setCompletedDeliveries(completed);
      setDelayedDeliveries(delayed);
  
      // Updated calculations
      const totalDeliveryEarnings = data.reduce((sum, delivery) => {
        const deliveryPrice = delivery.deliveryPrice ? parseFloat(delivery.deliveryPrice) : 0;
        return sum + deliveryPrice;
      }, 0);
      setTotalEarnings(totalDeliveryEarnings);
  
      const totalItemEarnings = data.reduce((sum, delivery) => {
        const itemsPrice = delivery.itemsPrice ? parseFloat(delivery.itemsPrice) : 0;
        return sum + itemsPrice;
      }, 0);
      setTotalDeliveredItems(totalItemEarnings);
  
      // Total Combined Earnings Calculation
      const totalCombinedEarnings = totalItemEarnings + totalDeliveryEarnings;
      // If you need to track this value in state, uncomment the line below:
      // setTotalCombinedEarnings(totalCombinedEarnings);
  
    } catch (error) {
      console.error("Error fetching deliveries:", error);
      setError(error.message);
    }
  };
  
  const fetchDrivers = async () => {
    try {
      const response = await fetch("/api/drivers");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setTotalDrivers(data.length);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchDeliveries();
    fetchDrivers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:p-8">
      <header className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, Yasith JY</h1>
        <p className="text-gray-600 mt-2">Track and manage your deliveries efficiently</p>
      </header>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard icon={<FaBox />} title="Total Deliveries" value={deliveries.length} color="green" />
        <DashboardCard icon={<FaClock />} title="Pending Deliveries" value={pendingDeliveries} color="yellow" />
        <DashboardCard icon={<FaCheck />} title="Completed Deliveries" value={completedDeliveries} color="blue" />
        <DashboardCard icon={<FaExclamationCircle />} title="Delayed Deliveries" value={delayedDeliveries} color="red" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard icon={<FaMoneyBill />} title="Total Delivery Earnings" value={priceFormatter.format(totalEarnings)} color="green" />
        <DashboardCard icon={<FaMoneyBill />} title="Total Item Earnings" value={priceFormatter.format(totalDeliveredItems)} color="blue" />
        <DashboardCard icon={<FaMoneyBill />} title="Total Earnings" value={priceFormatter.format(totalEarnings + totalDeliveredItems)} color="indigo" />
        <DashboardCard icon={<FaUser />} title="Total Drivers" value={totalDrivers} color="purple" />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Recent Deliveries</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">Delivery No</th>
                <th className="px-6 py-3">Items Price</th>
                <th className="px-6 py-3">Delivery Price</th>
                <th className="px-6 py-3">Total Price</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deliveries.slice(-5).reverse().map(delivery => (
                <tr key={delivery._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">{delivery._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{priceFormatter.format(delivery.itemsPrice || 0)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{priceFormatter.format(delivery.deliveryPrice || 0)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {priceFormatter.format((delivery.itemsPrice || 0) + (delivery.deliveryPrice || 0))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(delivery._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Running Line */}
      <div className="bg-blue-600 text-white py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-lg font-semibold mx-4">
            <FaTruck className="inline-block mr-2" />
            JAYASINGHE STORELINES PVT (LTD)
          </span>
          <span className="text-lg font-semibold mx-4">
            <FaCar className="inline-block mr-2" />
            JAYASINGHE STORELINES PVT (LTD)
          </span>
          <span className="text-lg font-semibold mx-4">
            <FaMotorcycle className="inline-block mr-2" />
            JAYASINGHE STORELINES PVT (LTD)
          </span>
          <span className="text-lg font-semibold mx-4">
            <FaBoxes className="inline-block mr-2" />
            JAYASINGHE STORELINES PVT (LTD)
          </span>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, value, color }) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:scale-105`}>
      <div className="flex items-center">
        <div className={`text-4xl text-${color}-500 mr-4`}>{icon}</div>
        <div>
          <h2 className={`text-2xl font-semibold text-${color}-600`}>{value}</h2>
          <p className="text-gray-600 text-sm mt-1">{title}</p>
        </div>
      </div>
    </div>
  );
}

