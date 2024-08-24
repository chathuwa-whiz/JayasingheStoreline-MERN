import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Alert = ({ type, title, message, additionalDetails, onDismiss }) => {
  const [showMore, setShowMore] = useState(false);

  const alertTypes = {
    info: 'text-blue-800 border-blue-300 bg-blue-50',
    danger: 'text-red-800 border-red-300 bg-red-50',
    success: 'text-green-800 border-green-300 bg-green-50',
    warning: 'text-yellow-800 border-yellow-300 bg-yellow-50',
  };

  return (
    <div className={`p-4 mb-4 ${alertTypes[type]} border rounded-lg`} role="alert">
      <div className="flex items-center">
        <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span className="sr-only">{type}</span>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className="mt-2 mb-4 text-sm">
        {message}
      </div>
      {showMore && additionalDetails && (
        <div className="mt-2 text-sm text-gray-600">
          {additionalDetails}
        </div>
      )}
      <div className="flex gap-2 mt-2">
        <button 
          type="button" 
          className={`text-${alertTypes[type].split(' ')[0]} bg-transparent border border-${alertTypes[type].split(' ')[0]} hover:bg-${alertTypes[type].split(' ')[0]}-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-${alertTypes[type].split(' ')[0]}-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center`}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? 'Show Less' : 'View More'}
        </button>
        <button 
          type="button" 
          className={`text-${alertTypes[type].split(' ')[0]} bg-transparent border border-${alertTypes[type].split(' ')[0]} hover:bg-${alertTypes[type].split(' ')[0]}-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-${alertTypes[type].split(' ')[0]}-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center`}
          onClick={onDismiss} 
          aria-label="Close"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

function Notification() {
  const [notifications, setNotifications] = useState([
    { id: 'NO1', deliveryId: 'D10', time: '12.45 pm', status: 'Delivered Successfully', type: 'success', additionalDetails: 'Package delivered to address XYZ on time.' },
    { id: 'NO2', deliveryId: 'D11', time: '01.00 pm', status: 'Delivery Failed', type: 'danger', additionalDetails: 'Package could not be delivered due to incorrect address.' },
    // Add more notifications with types and additionalDetails
  ]);

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
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

  return (
    <div className="flex flex-col gap-4 bg-gray-100 h-screen p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Notifications</h2>
        <div className="flex gap-4">
          <button className="bg-gray-200 rounded-md p-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L10 10.414l7 7a1 1 0 001.414-1.414l-7-7a1 1 0 00-1.414 0z" clipRule="evenodd"/>
            </svg>
            Filters
          </button>
          <button className="bg-gray-200 rounded-md p-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm4 0a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z" clipRule="evenodd"/>
            </svg>
            Select Date
          </button>
          <button className="bg-gray-200 rounded-md p-2 flex items-center gap-2" onClick={exportToPDF}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M14 3a1 1 0 01.707.293l3 3a1 1 0 01.293.707V17a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 01.293-.707l3-3A1 1 0 017 3h7zm-2 0H8v4h4V3zm6 6H4v8h14V9zM9 6H7v4h2V6z"/>
            </svg>
            Export to PDF
          </button>
          <div className="flex items-center gap-2">
            <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt="User Profile" className="rounded-full w-8 h-8"/>
            <span className="font-medium">Yasith JY</span>
          </div>
        </div>
      </div>
      <div id="notifications-content" className="bg-white rounded-md shadow-md p-4 overflow-x-auto">
        {notifications.map((notification) => (
          <Alert 
            key={notification.id}
            type={notification.type}
            title={`Delivery ${notification.status === 'Delivered Successfully' ? 'Successful' : 'Failed'}`}
            message={`Delivery ID: ${notification.deliveryId} at ${notification.time}`}
            additionalDetails={notification.additionalDetails}
            onDismiss={() => handleDeleteNotification(notification.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Notification;
