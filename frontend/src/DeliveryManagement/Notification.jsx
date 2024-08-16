import React, { useState } from 'react';

function Notification() {
  const [notifications, setNotifications] = useState([
    { id: 'NO1', deliveryId: 'D10', time: '12.45 pm', status: 'Delivered Successfully' },
    { id: 'NO1', deliveryId: 'D10', time: '12.45 pm', status: 'Delivered Successfully' },
    { id: 'NO1', deliveryId: 'D10', time: '12.45 pm', status: 'Delivered Successfully' },
    { id: 'NO1', deliveryId: 'D10', time: '12.45 pm', status: 'Delivered Successfully' },
    { id: 'NO1', deliveryId: 'D10', time: '12.45 pm', status: 'Delivered Successfully' },
    { id: 'NO1', deliveryId: 'D10', time: '12.45 pm', status: 'Delivered Successfully' },
  ]);

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Notification</h2>
        <div className="flex gap-4">
          <button className="bg-gray-200 rounded-md p-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L10 10.414l7 7a1 1 0 001.414-1.414l-7-7a1 1 0 00-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Filters
          </button>
          <button className="bg-gray-200 rounded-md p-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M8 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm4 0a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Select Date
          </button>
          <div className="flex items-center gap-2">
            <img
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
              alt="User Profile"
              className="rounded-full w-8 h-8"
            />
            <span className="font-medium">Yasith JY</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-md shadow-md p-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-xs font-medium uppercase tracking-wider">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Delivery ID</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Delivery Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <tr key={notification.id} className="hover:bg-gray-100">
                <td className="px-4 py-3">{notification.id}</td>
                <td className="px-4 py-3">{notification.deliveryId}</td>
                <td className="px-4 py-3">{notification.time}</td>
                <td className="px-4 py-3">{notification.status}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
                    More
                  </button>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M17.414 2.586a2 2 0 012.828 0l-7.778 7.778a2 2 0 01-2.828 0L2.586 17.414a2 2 0 010 2.828l7.778 7.778a2 2 0 012.828 0l7.778-7.778a2 2 0 010-2.828z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M5 3a2 2 0 012-2h10a2 2 0 012 2v3a2 2 0 01-2 2H7a2 2 0 01-2-2V3zM5 10a2 2 0 012-2h10a2 2 0 012 2v3a2 2 0 01-2 2H7a2 2 0 01-2-2V10zm5 5a2 2 0 012-2h6a2 2 0 012 2v3a2 2 0 01-2 2h-6a2 2 0 01-2-2v-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 cursor-pointer"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    onClick={() => handleDeleteNotification(notification.id)}
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 009 2zm11 5a1 1 0 01-1.414.146L10 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l4.293-4.293L7.586 5.414a1 1 0 01.146-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center gap-4">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Notification;