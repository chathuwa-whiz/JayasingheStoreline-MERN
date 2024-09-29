import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useDeleteDeliveryMutation, useGetDeliveriesQuery, useUpdateDeliveryMutation } from '../redux/api/deliveryApiSlice';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../asset/logo.png';


export default function DeliveryDetail({ onEditDelivery }) {
  const { data: deliveries, error: deliveriesError, isLoading } = useGetDeliveriesQuery();
  const [deleteDelivery] = useDeleteDeliveryMutation();
  const [updateDelivery] = useUpdateDeliveryMutation();
  const [searchTerm, setSearchTerm] = useState("");

  // Company Details
  const companyEmail = 'info@jayasinghestoreline.com';
  const companyTelephone = '+94 11 234 5678';
  const companyAddress = '123 Main Street, Colombo, Sri Lanka';

  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR',
  });

  const handleDelete = async (id) => {
    try {
      await deleteDelivery(id).unwrap();
    } catch (error) {
      console.error('Error deleting delivery:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    const delivery = deliveries.find((delivery) => delivery._id === id);
    const updatedDelivery = { ...delivery, deliveryStatus: status };
    try {
      await updateDelivery({ deliveryId: id, formData: updatedDelivery }).unwrap();
      window.location.reload();
    } catch (error) {
      console.error('Error updating delivery:', error);
    }
  };

  const getRowClass = (status) => {
    switch (status) {
      case 'Delayed':
        return 'bg-blue-50 border-blue-300 text-blue-700';
      case 'Completed':
        return 'bg-green-50 border-green-300 text-green-700';
      default:
        return 'bg-white border-gray-300 text-gray-700';
    }
  };

  const getButtonClass = (currentStatus, buttonStatus) => {
    return currentStatus === buttonStatus
      ? `p-2 text-black rounded-lg`
      : `p-2 text-${buttonStatus === 'Pending' ? 'yellow' : buttonStatus === 'Delayed' ? 'blue' : 'green'}-500 hover:bg-${buttonStatus === 'Pending' ? 'yellow' : buttonStatus === 'Delayed' ? 'blue' : 'green'}-100 rounded-lg transition-colors duration-300`;
  };

  const downloadPDF = async () => {
    // Create a jsPDF instance with landscape orientation
    const doc = new jsPDF('l', 'mm', 'a4');
  
    // Add logo to the top left
    const img = new Image();
    img.src = logo;
    await new Promise(resolve => {
      img.onload = resolve;
    });
    doc.addImage(img, 'PNG', 14, 10, 30, 30);
  
    // Add company name below the logo
    doc.setFontSize(20);
    doc.text('Jayasinghe Storelines PVT LTD', 50, 25);
  
    // Add company details to the top right
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.text(`Email: ${companyEmail}`, 270, 15, { align: 'right' });
    doc.text(`Telephone: ${companyTelephone}`, 270, 22, { align: 'right' });
    doc.text(`Address: ${companyAddress}`, 270, 29, { align: 'right' });
  
    // Add title below the company name
    doc.setFontSize(18);
    doc.text('Delivery Details', 14, 50);
  
    // Prepare table data
const tableData = deliveries.map(delivery => [
  delivery._id,
  JSON.parse(delivery.deliveryItem).map(item => `${item.name} x ${item.qty}`).join(', '),
  delivery.firstName,
  delivery.telephoneNo,
  delivery.createdAt ? new Date(delivery.createdAt).toLocaleDateString() : 'Date not available',
  priceFormatter.format(delivery.itemsPrice),
  priceFormatter.format(delivery.deliveryPrice),
  priceFormatter.format(delivery.totalPrice),
  delivery.deliveryStatus || 'Pending'
]);

  
    // Generate the table
    autoTable(doc, {
      head: [['Delivery No', 'Delivery Item', 'Name', 'Contact No', 'CreatedAt', 'Items Price', 'Delivery Price', 'Total Price', 'Status']],
      body: tableData,
      startY: 60,
    });
  
    // Save the PDF
    doc.save('Delivery-Details.pdf');
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Filter deliveries based on search term
  const filteredDeliveries = deliveries.filter((delivery) =>
    delivery._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered Deliveries", filteredDeliveries);

  return (
    <div className="shadow-lg rounded-lg p-6 bg-gray-100 h-screen overflow-auto">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Deliveries</h1>

      <input
        type="text"
        placeholder="Search Deliveries by Delivery No"
        className="p-3 border border-gray-300 rounded-lg mb-6 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
        onClick={downloadPDF}
      >
        Download PDF
      </button>

      <table className="w-full bg-white shadow-lg rounded-lg border border-gray-300">
  <thead className="bg-gray-200 text-gray-700">
    <tr>
      <th className="border p-3 text-left">Delivery No</th>
      <th className="border p-3 text-left">Delivery Item</th>
      <th className="border p-3 text-left">Name</th>
      <th className="border p-3 text-left">Contact No</th>
      <th className="border p-3 text-left">Delivery Address</th> {/* New column for delivery address */}
      <th className="border p-3 text-left">Order Date</th> {/* New column for order date */}
      <th className="border p-3 text-left">Items Price</th>
      <th className="border p-3 text-left">Delivery Price</th>
      <th className="border p-3 text-left">Total Price</th>
      <th className="border p-3 text-left">Status</th>
      <th className="border p-3 text-left">Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredDeliveries.map((delivery) => (
      <tr key={delivery._id} className={`border-b ${getRowClass(delivery.deliveryStatus)} hover:bg-orange-100 transition-colors duration-300`}>
        <td className="border p-3">{delivery._id}</td>
        <td className="border p-3">
          {JSON.parse(delivery.deliveryItem).map((item) => (
            <div key={item._id}>
              <p>{item.name} x {item.qty}</p>
            </div>
          ))}
        </td>
        <td className="border p-3">{delivery.firstName}</td>
        <td className="border p-3">{delivery.telephoneNo}</td>
        <td className="border p-3">{`${delivery.address}, ${delivery.city}, ${delivery.province}, ${delivery.postalCode}`}</td> {/* Show delivery address */}
        <td className="border p-3">{delivery.createdAt ? new Date(delivery.createdAt).toLocaleDateString() : 'Date not available'}</td>{/* Format order date */}
        <td className="border p-3">{priceFormatter.format(delivery.itemsPrice)}</td>
        <td className="border p-3">{priceFormatter.format(delivery.deliveryPrice)}</td>
        <td className="border p-3">{priceFormatter.format(delivery.totalPrice)}</td>
        <td className="border p-3">{delivery.deliveryStatus || 'Pending'}</td>
        <td className="border p-3 flex space-x-2">
          <button className={getButtonClass(delivery.deliveryStatus, 'Pending')} onClick={() => handleStatusChange(delivery._id, 'Pending')}>
            Pending
          </button>
          <button className={getButtonClass(delivery.deliveryStatus, 'Delayed')} onClick={() => handleStatusChange(delivery._id, 'Delayed')}>
            Delayed
          </button>
          <button className={getButtonClass(delivery.deliveryStatus, 'Completed')} onClick={() => handleStatusChange(delivery._id, 'Completed')}>
            Completed
          </button>
          <button className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors duration-300" onClick={() => handleDelete(delivery._id)}>
            <FaTrash />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}
