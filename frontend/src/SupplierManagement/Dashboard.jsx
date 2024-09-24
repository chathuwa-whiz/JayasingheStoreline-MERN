import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { useGetSuppliersQuery } from "../redux/api/supplierApiSlice";
import { useAllProductsQuery } from "../redux/api/productApiSlice";

export default function SupplierManagementDashboard() {
  // Fetch suppliers and products data
  const { data: suppliersData, isLoading: isLoadingSuppliers } = useGetSuppliersQuery({keyword : ''});
  const { data: productsData, isLoading: isLoadingProducts } = useAllProductsQuery();
  

  // Sample data for charts
  const supplierAchievementData = {
    labels: ['Met Targets', 'Below Targets', 'Above Targets'],
    datasets: [
      {
        label: 'Supplier Achievement',
        data: [60, 30, 10],
        backgroundColor: ['#34D399', '#FBBF24', '#3B82F6'],
        borderWidth: 1,
      },
    ],
  };

  const inventoryNotificationData = {
    labels: ['Electronics', 'Furniture', 'Clothing'],
    datasets: [
      {
        label: 'Inventory Levels',
        data: [200, 150, 100],
        backgroundColor: ['#60A5FA', '#F87171', '#FBBF24'],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Purchases',
        data: [50, 75, 60, 80, 95, 100],
        fill: false,
        backgroundColor: '#4F46E5',
        borderColor: '#4F46E5',
      },
    ],
  };

  // Low stock products sample data
  const lowStockProducts = productsData
    ? productsData.filter(product => product.currentQty < 10)
    : [];

  return (
    <div className="min-h-screen bg-gray-50 p-8 overflow-y-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, Dulangi Tharusha</h1>
        <p className="text-gray-500">Keep track of your supplier performance and inventory status</p>
      </header>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-green-200 p-6 rounded-lg text-center shadow-lg">
          <h2 className="text-4xl font-bold text-green-800">{isLoadingSuppliers ? '...' : suppliersData?.length}</h2>
          <p className="text-lg text-green-700">Total Suppliers</p>
          <p className="text-green-600 text-sm">+10% +2.0k this week</p>
        </div>
        <div className="bg-yellow-200 p-6 rounded-lg text-center shadow-lg">
          <h2 className="text-4xl font-bold text-yellow-800">240</h2>
          <p className="text-lg text-yellow-700">Total Supplier Orders</p>
          <p className="text-yellow-600 text-sm">+18% +2.8k this week</p>
        </div>
        <div className="bg-blue-200 p-6 rounded-lg text-center shadow-lg">
          <h2 className="text-4xl font-bold text-blue-800">6,534</h2>
          <p className="text-lg text-blue-700">Total Purchases</p>
          <p className="text-blue-600 text-sm">+18% +7.8k this week</p>
        </div>
        <div className="bg-red-200 p-6 rounded-lg text-center shadow-lg">
          <h2 className="text-4xl font-bold text-red-800">{lowStockProducts.length}</h2>
          <p className="text-lg text-red-700">Low Stock Alerts</p>
          <p className="text-red-600 text-sm">Urgent restocks needed</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Inventory Notification</h3>
          <div className="relative h-64">
            <Pie data={inventoryNotificationData} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Supplier Achievement</h3>
          <div className="relative h-64">
            <Pie data={supplierAchievementData} />
          </div>
        </div>
      </div>

      {/* Low Stock Products Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-bold mb-4 text-red-800">Low Stock Products</h3>
        {isLoadingProducts ? (
          <p>Loading products...</p>
        ) : lowStockProducts.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-red-100">
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Stock</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {lowStockProducts.map((product) => (
                <tr key={product.id} className="hover:bg-red-50">
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">{product.category}</td>
                  <td className="py-2 px-4 border-b">{product.countInStock}</td>
                  <td className="py-2 px-4 border-b">
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Restock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">All products are sufficiently stocked.</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Monthly Purchase Trends</h3>
        <div className="relative">
          <Line data={lineChartData} />
        </div>
      </div>

    </div>
  );
}
