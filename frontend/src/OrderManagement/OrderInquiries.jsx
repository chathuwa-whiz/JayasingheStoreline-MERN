import React, { useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';

export default function OrderInquiries() {
  const [currentPage, setCurrentPage] = useState(1);
  const inquiriesPerPage = 10;

  // Dummy data for order inquiries
  const orderInquiries = [
    {
      id: 1,
      customerName: 'John Doe',
      orderId: 'ORD123456',
      inquiryDate: '2024-08-15',
      status: 'Pending',
      message: 'Can I change the delivery address?',
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      orderId: 'ORD654321',
      inquiryDate: '2024-08-14',
      status: 'Resolved',
      message: 'I want to cancel my order.',
    },
    {
      id: 3,
      customerName: 'Alice Johnson',
      orderId: 'ORD789012',
      inquiryDate: '2024-08-13',
      status: 'Pending',
      message: 'Where is my order?',
    },
    {
      id: 4,
      customerName: 'Bob Brown',
      orderId: 'ORD890123',
      inquiryDate: '2024-08-12',
      status: 'In Progress',
      message: 'Can I get a discount?',
    },
    // Add more dummy inquiries as needed
  ];

  // Calculate the indices of the inquiries to display
  const indexOfLastInquiry = currentPage * inquiriesPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage;
  const currentInquiries = orderInquiries.slice(indexOfFirstInquiry, indexOfLastInquiry);

  // Calculate total pages
  const totalPages = Math.ceil(orderInquiries.length / inquiriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (id) => {
    // Implement the edit functionality here
    console.log('Edit inquiry:', id);
  };

  const handleDelete = (id) => {
    // Implement the delete functionality here
    console.log('Delete inquiry:', id);
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
      <table className="min-w-full overflow-y-auto min-h-full border rounded-lg bg-white">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Inquiry Id</th>
            <th className="py-2 px-4 text-left">Customer Name</th>
            <th className="py-2 px-4 text-left">Order Id</th>
            <th className="py-2 px-4 text-left">Inquiry Date</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Message</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentInquiries.map((inquiry) => (
            <tr key={inquiry.id} className="border-b border-gray-200">
              <td className="py-2 px-4">{inquiry.id}</td>
              <td className="py-2 px-4">{inquiry.customerName}</td>
              <td className="py-2 px-4">{inquiry.orderId}</td>
              <td className="py-2 px-4">{inquiry.inquiryDate}</td>
              <td className="py-2 px-4">{inquiry.status}</td>
              <td className="py-2 px-4">{inquiry.message}</td>
              <td className="py-2 px-4">
                <button
                  className="text-green-500 hover:text-green-700 mx-2"
                  onClick={() => handleEdit(inquiry.id)}
                >
                  <FaPen />
                </button>
                <button
                  className="text-red-500 hover:text-red-700 mx-2"
                  onClick={() => handleDelete(inquiry.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
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
