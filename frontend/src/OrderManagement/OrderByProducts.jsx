import React, { useState, useEffect } from 'react';
import { useAllProductsQuery } from '../redux/api/productApiSlice'; // Assuming you have a product API slice

export default function Products() {
  const { data: products, isLoading: productsLoading, isError: productsError } = useAllProductsQuery();

  // State to store order summary data
  const [orderSummary, setOrderSummary] = useState([]);  // Ensure it's initialized as an empty array
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Format Prices
  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR',
  });

  // Fetch order summary data from the backend
  useEffect(() => {
    const fetchOrderSummary = async () => {
      try {
        const response = await fetch('/api/orders/product-summary'); // Adjust the API endpoint
        const data = await response.json();
        if (Array.isArray(data)) {
          setOrderSummary(data);  // Ensure data is an array before setting it
        } else {
          console.error("Order summary data is not an array", data);
          setOrderSummary([]);  // Set an empty array if data format is incorrect
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching order summary:', error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchOrderSummary();
  }, []);

  // Display loading or error states
  if (productsLoading || isLoading) return <div>Loading...</div>;
  if (productsError || isError) return <div>Something went wrong</div>;

  // Paginate products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // // Get order summary data by product name
  // const getOrderSummaryByProductName = (productName) => {
  //   if (!Array.isArray(orderSummary)) return { totalOrders: 0, totalRevenue: 0 };  // Check if orderSummary is an array
  //   const summary = orderSummary.find((summary) => summary._id === productName);
  //   return summary || { totalOrders: 0, totalRevenue: 0 };
  // };

  const getOrderSummaryByProductName = (productName, index) => {
    // Dummy data for the first 4 products
    const dummyData = [
      { _id: 'Product 1', totalOrders: 15, totalRevenue: 15000 },
      { _id: 'Product 2', totalOrders: 20, totalRevenue: 25000 },
      { _id: 'Product 3', totalOrders: 10, totalRevenue: 12000 },
      { _id: 'Product 4', totalOrders: 8, totalRevenue: 9000 },
    ];
  
    // For the first 4 products, return the dummy data
    if (index < 4) {
      return dummyData[index];
    }
  
    // Return default values for other products
    return { totalOrders: 0, totalRevenue: 0 };
  };

  return (
    <div className="rounded-lg p-8">
      <table className="min-w-full border rounded-lg bg-white">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="py-2 px-4 text-left">#</th>
            <th className="py-2 px-4 text-left">Image</th>
            <th className="py-2 px-4 text-left">Product ID</th>
            <th className="py-2 px-4 text-left">Product Name</th>
            <th className="py-2 px-4 text-left">Category</th>
            <th className="py-2 px-4 text-left">Selling Price</th>
            <th className="py-2 px-4 text-left">Buying Price</th>
            <th className="py-2 px-4 text-left">Total Orders</th>
            <th className="py-2 px-4 text-left">Total Revenue</th>
          </tr>
        </thead>
        {/* <tbody>
          {currentProducts.map((product, index) => {
            const { totalOrders, totalRevenue } = getOrderSummaryByProductName(product.name);
            
            return (
              <tr key={product._id} className="border-b border-gray-200">
                <td className="py-2 px-4">{indexOfFirstProduct + index + 1}</td>
                <td className="py-2 px-4">
                  <img src={product.image} alt={product.name} className="w-10 h-10" />
                </td>
                <td className="py-2 px-4">{product.sku}</td>
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">{product.category}</td>
                <td className="py-2 px-4">{priceFormatter.format(product.sellingPrice)}</td>
                <td className="py-2 px-4">{priceFormatter.format(product.buyingPrice)}</td>
                <td className="py-2 px-4">{totalOrders}</td>
                <td className="py-2 px-4">{priceFormatter.format(totalRevenue)}</td>
              </tr>
            );
          })}
        </tbody> */}

      <tbody>
        {currentProducts.map((product, index) => {
          // Pass product name and index to get the summary
          const { totalOrders, totalRevenue } = getOrderSummaryByProductName(product.name, index);

          return (
            <tr key={product._id} className="border-b border-gray-200">
              <td className="py-2 px-4">{indexOfFirstProduct + index + 1}</td>
              <td className="py-2 px-4">
                <img src={product.image} alt={product.name} className="w-10 h-10" />
              </td>
              <td className="py-2 px-4">{product.sku}</td>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">{product.category}</td>
              <td className="py-2 px-4">{priceFormatter.format(product.sellingPrice)}</td>
              <td className="py-2 px-4">{priceFormatter.format(product.buyingPrice)}</td>
              <td className="py-2 px-4">{totalOrders}</td>
              <td className="py-2 px-4">{priceFormatter.format(totalRevenue)}</td>
            </tr>
          );
        })}
      </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`mx-1 px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
