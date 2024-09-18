import React from 'react';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGetSuppliersQuery } from "../redux/api/supplierApiSlice";

export default function SupplierList() {

  const {data: suppliers, isError, isLoading} = useGetSuppliersQuery({keyword : ''});

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error happened...</div>

  console.log(suppliers)

  return (
    <div className="p-8 overflow-auto bg-gray-100">
      <table className="min-w-full bg-white border border-orange-500">
        <thead className="bg-orange-500">
          <tr>
            <th className="py-2 px-4 text-left">#</th>
            <th className="py-2 px-4 text-left">Image</th>
            <th className="py-2 px-4 text-left">NIC</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Phone Number</th>
            <th className="py-2 px-4 text-left">Type</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Gender</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier, index) => (
            <tr key={supplier._id} className="border-b border-gray-200">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">
                <img src={supplier.image} alt={supplier.name} className="w-10 h-10" />
              </td>
              <td className="py-2 px-4">{supplier.nic}</td>
              <td className="py-2 px-4">{supplier.name}</td>
              <td className="py-2 px-4">{supplier.phone}</td>
              <td className="py-2 px-4">{supplier.type}</td>
              <td className="py-2 px-4">{new Date(supplier.createdAt).toLocaleDateString()}</td>
              <td className="py-2 px-4">{supplier.gender}</td>
              <td className="py-2 px-4 flex space-x-2">
                <Link to={`../update/${supplier._id}`} className="btn btn-success">
                  <FaPen />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

