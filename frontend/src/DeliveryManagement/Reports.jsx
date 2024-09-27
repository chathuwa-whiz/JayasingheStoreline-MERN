// ReportPage.jsx

import React, { useState } from "react";
import { useGetDeliveriesQuery, useGetFilteredDeliveriesQuery } from "../redux/api/deliveryApiSlice";

export default function Reports() {
  const [filter, setFilter] = useState("");
  const { data: deliveries, isLoading, isError } = useGetDeliveriesQuery();
  const { data: filteredDeliveries } = useGetFilteredDeliveriesQuery({ filterData: { status: filter } }, { skip: !filter });

  console.log("Deliveries:", deliveries);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const displayDeliveries = filter ? filteredDeliveries : deliveries;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading deliveries.</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Delivery Report</h1>
      
      <div className="mb-4">
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filter by status..."
          className="border border-gray-300 p-2 rounded-md"
        />
      </div>

      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {displayDeliveries && displayDeliveries.map((delivery) => (
            <tr key={delivery._id}>
              <td className="border border-gray-300 px-4 py-2">{delivery._id}</td>
              <td className="border border-gray-300 px-4 py-2">{delivery.deliveryStatus}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(delivery.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};