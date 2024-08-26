import React, { useState, useEffect } from 'react';

function HrNotify() {
  // Dummy data for notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New HR Update', message: 'HR Manager has sent a new update.', status: 'Pending', date: '2024-08-22' },
    { id: 2, title: 'Policy Change', message: 'New company policies have been updated.', status: 'Accepted', date: '2024-08-21' },
  ]);

  // Uncomment this when integrating with backend
  /*
  useEffect(() => {
    // Fetch notifications from backend
    fetch('/api/hr-notifications')
      .then(response => response.json())
      .then(data => {
        // Update state with fetched notifications
        setNotifications(data);
      })
      .catch(error => console.error('Error fetching notifications:', error));
  }, []);
  */

  // Function to handle status change
  const updateStatus = (id, newStatus) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, status: newStatus } : notification
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">HR Notifications</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-3 px-5 bg-gray-200">Title</th>
              <th className="py-3 px-5 bg-gray-200">Message</th>
              <th className="py-3 px-5 bg-gray-200">Date</th>
              <th className="py-3 px-5 bg-gray-200">Status</th>
              <th className="py-3 px-5 bg-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map(notification => (
              <tr key={notification.id} className="hover:bg-gray-100">
                <td className="py-4 px-5 border-b">{notification.title}</td>
                <td className="py-4 px-5 border-b">{notification.message}</td>
                <td className="py-4 px-5 border-b">{notification.date}</td>
                <td className="py-4 px-5 border-b">
                  <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                    notification.status === 'Accepted' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800 '
                  }`}>
                    {notification.status}
                  </span>
                </td>
                <td className="py-4 px-5 border-b">
                  <button
                    onClick={() => updateStatus(notification.id, 'Accepted')}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                    disabled={notification.status === 'Accepted'}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(notification.id, 'Pending')}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2"
                    disabled={notification.status === 'Pending'}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => updateStatus(notification.id, 'Delete')}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    disabled={notification.status === 'Delete'}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HrNotify;
