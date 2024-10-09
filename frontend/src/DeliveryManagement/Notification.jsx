import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Notification() {
  const [notifications, setNotifications] = useState([
    { id: 'NO1', deliveryId: 'D10', time: '12:45 PM', status: 'Delivered Successfully', type: 'success', date: '2024-08-24', driver: 'John Doe', additionalDetails: 'Package delivered to address XYZ on time.' },
    { id: 'NO2', deliveryId: 'D11', time: '01:00 PM', status: 'Delivery Failed', type: 'danger', date: '2024-08-25', driver: 'Jane Smith', additionalDetails: 'Package could not be delivered due to incorrect address.' },
    { id: 'NO3', deliveryId: 'D12', time: '02:15 PM', status: 'Delivered Successfully', type: 'success', date: '2024-08-26', driver: 'Emily Johnson', additionalDetails: 'Package delivered to address ABC on time.' },
    { id: 'NO4', deliveryId: 'D13', time: '03:30 PM', status: 'Delivery Failed', type: 'danger', date: '2024-08-27', driver: 'Michael Brown', additionalDetails: 'Recipient was unavailable at the delivery time.' },
    { id: 'NO5', deliveryId: 'D14', time: '04:00 PM', status: 'Delivered Successfully', type: 'success', date: '2024-08-28', driver: 'Chris Lee', additionalDetails: 'Package delivered with signature required.' },
    { id: 'NO6', deliveryId: 'D15', time: '05:45 PM', status: 'Delivery Failed', type: 'danger', date: '2024-08-29', driver: 'Sarah Wilson', additionalDetails: 'Delivery address not found.' },
    { id: 'NO7', deliveryId: 'D16', time: '06:30 PM', status: 'Delivered Successfully', type: 'success', date: '2024-08-30', driver: 'David Green', additionalDetails: 'Package successfully delivered to front desk.' },
    { id: 'NO8', deliveryId: 'D17', time: '07:15 PM', status: 'Delivery Failed', type: 'danger', date: '2024-08-31', driver: 'Anna Kim', additionalDetails: 'Failed due to weather conditions.' },
    { id: 'NO9', deliveryId: 'D18', time: '08:00 AM', status: 'Delivered Successfully', type: 'success', date: '2024-09-01', driver: 'James Carter', additionalDetails: 'Delivered to mailbox as requested.' },
    { id: 'NO10', deliveryId: 'D19', time: '09:30 AM', status: 'Delivery Failed', type: 'danger', date: '2024-09-02', driver: 'Laura Brown', additionalDetails: 'Insufficient address details provided.' },
  ]);

  const [filteredNotifications, setFilteredNotifications] = useState(notifications);
  const [selectedDate, setSelectedDate] = useState('');
  const [expandedNotifications, setExpandedNotifications] = useState({});

  const handleDeleteNotification = (id) => {
    const updatedNotifications = notifications.filter((notification) => notification.id !== id);
    setNotifications(updatedNotifications);
    setFilteredNotifications(updatedNotifications.filter((notification) => notification.id !== id));
  };

  const handleToggleExpand = (id) => {
    setExpandedNotifications(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const content = document.getElementById('notifications-content');

    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.save('notifications.pdf');
    });
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);

    if (date) {
      setFilteredNotifications(notifications.filter(notification => notification.date === date));
    } else {
      setFilteredNotifications(notifications);
    }
  };

  return (
    <div className="flex flex-col gap-6 bg-gray-100 min-h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Notifications</h2>
        <div className="flex gap-4 items-center">
          <input 
            type="date" 
            value={selectedDate}
            onChange={handleDateChange}
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-gray-200 rounded-md p-3 flex items-center gap-2 hover:bg-gray-300 transition-colors duration-300" onClick={exportToPDF}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M14 3a1 1 0 01.707.293l3 3a1 1 0 01.293.707V17a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 01.293-.707l3-3A1 1 0 017 3h7zm-2 0H8v4h4V3zm6 6H4v8h14V9zM9 6H7v4h2V6z"/>
            </svg>
            Export to PDF
          </button>
        </div>
      </div>
      <div id="notifications-content" className="bg-white rounded-md shadow-lg p-6 overflow-x-auto">
        {filteredNotifications.map((notification) => (
          <div key={notification.id} className={`p-4 mb-4 ${notification.type === 'success' ? 'text-green-800 border-green-300 bg-green-50' : 'text-red-800 border-red-300 bg-red-50'} border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300`} role="alert">
            <div className="flex items-center">
              <svg className="flex-shrink-0 w-5 h-5 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span className="sr-only">{notification.type}</span>
              <h3 className="text-lg font-medium">{`Delivery ${notification.status === 'Delivered Successfully' ? 'Successful' : 'Failed'}`}</h3>
            </div>
            <div className="mt-2 mb-4 text-sm">
              {`Delivery ID: ${notification.deliveryId} at ${notification.time} by ${notification.driver}`}
            </div>
            {expandedNotifications[notification.id] && notification.additionalDetails && (
              <div className="mt-2 text-sm text-gray-700">
                {notification.additionalDetails}
              </div>
            )}
            <div className="flex gap-2 mt-2">
              <button 
                type="button" 
                className={`text-${notification.type === 'success' ? 'green' : 'red'}-800 bg-transparent border border-${notification.type === 'success' ? 'green' : 'red'}-300 hover:bg-${notification.type === 'success' ? 'green' : 'red'}-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-${notification.type === 'success' ? 'green' : 'red'}-200 font-medium rounded-lg text-xs px-4 py-2 transition-colors duration-300`}
                onClick={() => handleToggleExpand(notification.id)}
              >
                {expandedNotifications[notification.id] ? 'Show Less' : 'View More'}
              </button>
              <button 
                type="button" 
                className={`text-${notification.type === 'success' ? 'green' : 'red'}-800 bg-transparent border border-${notification.type === 'success' ? 'green' : 'red'}-300 hover:bg-${notification.type === 'success' ? 'green' : 'red'}-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-${notification.type === 'success' ? 'green' : 'red'}-200 font-medium rounded-lg text-xs px-4 py-2 transition-colors duration-300`}
                onClick={() => handleDeleteNotification(notification.id)}
                aria-label="Close"
              >
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
