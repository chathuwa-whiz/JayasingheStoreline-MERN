import React, { useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';

export default function OrderInquiries() {
  const [currentPage, setCurrentPage] = useState(1);
  const inquiriesPerPage = 10;

  // Extended dummy data for order inquiries with updated IDs
  const orderInquiries = [
    {
      id: 'IID1',
      customerName: 'Vidumini Chalanika',
      orderId: 'ORD123456',
      inquiryDate: '2024-08-15',
      status: 'Pending',
      message: 'Can I change the delivery address?',
    },
    {
      id: 'IID2',
      customerName: 'Sunimal Perera',
      orderId: 'ORD654321',
      inquiryDate: '2024-08-14',
      status: 'Resolved',
      message: 'I want to cancel my order.',
    },
    {
      id: 'IID3',
      customerName: 'Kalani Rajapaksha',
      orderId: 'ORD789012',
      inquiryDate: '2024-08-13',
      status: 'Pending',
      message: 'Where is my order?',
    },
    {
      id: 'IID4',
      customerName: 'Saduni Gamage',
      orderId: 'ORD890123',
      inquiryDate: '2024-08-12',
      status: 'In Progress',
      message: 'Can I get a discount?',
    },
    {
      id: 'IID5',
      customerName: 'Ravi Kumar',
      orderId: 'ORD234567',
      inquiryDate: '2024-08-11',
      status: 'Resolved',
      message: 'The product arrived damaged.',
    },
    {
      id: 'IID6',
      customerName: 'Nisha De Silva',
      orderId: 'ORD345678',
      inquiryDate: '2024-08-10',
      status: 'Pending',
      message: 'When will my order be shipped?',
    },
    {
      id: 'IID7',
      customerName: 'Arjun Fernando',
      orderId: 'ORD456789',
      inquiryDate: '2024-08-09',
      status: 'In Progress',
      message: 'Can I change the payment method?',
    },
    {
      id: 'IID8',
      customerName: 'Anitha Wijesinghe',
      orderId: 'ORD567890',
      inquiryDate: '2024-08-08',
      status: 'Pending',
      message: 'I received the wrong item.',
    },
    {
      id: 'IID9',
      customerName: 'Nimal Perera',
      orderId: 'ORD678901',
      inquiryDate: '2024-08-07',
      status: 'Resolved',
      message: 'Requesting a refund.',
    },
    {
      id: 'IID10',
      customerName: 'Shanika Madushan',
      orderId: 'ORD789013',
      inquiryDate: '2024-08-06',
      status: 'In Progress',
      message: 'Need assistance with installation.',
    },
    // Additional dummy data
    {
      id: 'IID11',
      customerName: 'Tharindu Abeysekera',
      orderId: 'ORD890234',
      inquiryDate: '2024-08-05',
      status: 'Pending',
      message: 'Can I update my shipping address?',
    },
    {
      id: 'IID12',
      customerName: 'Kasun Weerasinghe',
      orderId: 'ORD901345',
      inquiryDate: '2024-08-04',
      status: 'Resolved',
      message: 'The item was not as described.',
    },
    {
      id: 'IID13',
      customerName: 'Madhavi Kularathna',
      orderId: 'ORD012456',
      inquiryDate: '2024-08-03',
      status: 'In Progress',
      message: 'How can I track my order?',
    },
    {
      id: 'IID14',
      customerName: 'Dilan Perera',
      orderId: 'ORD123567',
      inquiryDate: '2024-08-02',
      status: 'Pending',
      message: 'My order was missing some items.',
    },
    {
      id: 'IID15',
      customerName: 'Nadeesha Samaraweera',
      orderId: 'ORD234678',
      inquiryDate: '2024-08-01',
      status: 'Resolved',
      message: 'Can I return this product?',
    },
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
              <td className="px-4 py-2">
                <span
                  className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${
                    inquiry.status === 'Resolved'
                      ? 'bg-green-200 text-green-800'
                      : inquiry.status === 'In Progress'
                      ? 'bg-yellow-200 text-yellow-800'
                      : 'bg-red-200 text-red-800'
                  }`}
                >
                  {inquiry.status}
                </span>
              </td>
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
