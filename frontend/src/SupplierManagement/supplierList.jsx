import React, { useState } from 'react';
import { FaEye, FaPen, FaTrash, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGetSuppliersQuery } from "../redux/api/supplierApiSlice";

export default function SupplierList() {
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Fetch suppliers based on the search keyword
  const { data: suppliers, isError, isLoading } = useGetSuppliersQuery({ keyword });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error happened...</div>;

  // Handle search change and generate suggestions
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
  
    if (value) {
      const newSuggestions = suppliers.filter((supplier) => {
        const nic = typeof supplier.nic === 'string' ? supplier.nic.toLowerCase() : '';
        const name = typeof supplier.name === 'string' ? supplier.name.toLowerCase() : '';
        return nic.includes(value.toLowerCase()) || name.includes(value.toLowerCase());
      });
      setSuggestions(newSuggestions.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

    // Filter suppliers based on the keyword for the table
    const filteredSuppliers = suppliers.filter((supplier) => {
      const nic = typeof supplier.nic === 'string' ? supplier.nic.toLowerCase() : '';
      const name = typeof supplier.name === 'string' ? supplier.name.toLowerCase() : '';
      return nic.includes(keyword.toLowerCase()) || name.includes(keyword.toLowerCase());
    });
  
 return (
    <div className="p-8 overflow-auto bg-gray-200">
      {/* Search Bar with dropdown suggestions */}
      <div className="relative mb-4 w-full">
        <div className="flex items-center">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search suppliers..."
            value={keyword}
            onChange={handleSearchChange}
            className="pl-10 py-2 border border-orange-300 rounded w-2/3"
          />
        </div>
        {/* Dropdown for suggestions */}
        {suggestions.length > 0 && (
          <div className="bg-white border mt-1 rounded-lg shadow-lg absolute right-0 z-10 max-h-40 overflow-y-auto w-2/3">
            {suggestions.map((supplier) => (
              <div
                key={supplier._id}
                onClick={() => {
                  setKeyword(supplier.nic); // or supplier.name
                  setSuggestions([]); // Clear suggestions after selection
                }}
                className="p-2 hover:bg-orange-300 cursor-pointer"
              >
                {supplier.nic} - {supplier.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Suppliers Table */}
      <table className="min-w-full bg-white border border-orange-500">
        <thead className="bg-orange-500">
          <tr>
            <th className="py-2 px-4 text-left">#</th>
            <th className="py-2 px-4 text-left">Image</th>
            <th className="py-2 px-4 text-left">NIC</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Phone Number</th>
            <th className="py-2 px-4 text-left">Type</th>
            <th className="py-2 px-4 text-left">Gender</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredSuppliers.length > 0 ? (
            filteredSuppliers.map((supplier, index) => (
              <tr key={supplier._id} className="border-b border-gray-200">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">
                  <img src={supplier.image} alt={supplier.name} className="w-10 h-10" />
                </td>
                <td className="py-2 px-4">{supplier.nic}</td>
                <td className="py-2 px-4">{supplier.name}</td>
                <td className="py-2 px-4">{supplier.phone}</td>
                <td className="py-2 px-4">{supplier.type}</td>
                <td className="py-2 px-4">{supplier.gender}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <Link to={`../update/${supplier._id}`} className="btn btn-success">
                    <FaPen />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="py-4 text-center">No suppliers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}