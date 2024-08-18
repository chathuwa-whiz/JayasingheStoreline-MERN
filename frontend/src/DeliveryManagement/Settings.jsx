import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: 'NoLimit Deliveries',
    timeZone: 'GMT+5:30',
    operatingHours: {
      start: '09:00 AM',
      end: '06:00 PM',
    },
    deliveryFee: 5.0,
    maxDeliveriesPerDay: 100,
    notificationPreferences: {
      sms: true,
      email: true,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      {/* General Settings */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">General Settings</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Company Name</label>
          <input 
            type="text" 
            name="companyName" 
            value={settings.companyName} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Time Zone</label>
          <select 
            name="timeZone" 
            value={settings.timeZone} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="GMT-5:00">GMT-5:00</option>
            <option value="GMT+1:00">GMT+1:00</option>
            <option value="GMT+5:30">GMT+5:30</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Operating Hours</label>
          <div className="flex space-x-4">
            <input 
              type="time" 
              name="start" 
              value={settings.operatingHours.start} 
              onChange={(e) => setSettings({ ...settings, operatingHours: { ...settings.operatingHours, start: e.target.value } })} 
              className="w-1/2 p-2 border border-gray-300 rounded-lg"
            />
            <input 
              type="time" 
              name="end" 
              value={settings.operatingHours.end} 
              onChange={(e) => setSettings({ ...settings, operatingHours: { ...settings.operatingHours, end: e.target.value } })} 
              className="w-1/2 p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Delivery Settings */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Delivery Settings</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Delivery Fee ($)</label>
          <input 
            type="number" 
            name="deliveryFee" 
            value={settings.deliveryFee} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Max Deliveries Per Day</label>
          <input 
            type="number" 
            name="maxDeliveriesPerDay" 
            value={settings.maxDeliveriesPerDay} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Notify by SMS</label>
          <input 
            type="checkbox" 
            name="sms" 
            checked={settings.notificationPreferences.sms} 
            onChange={(e) => setSettings((prev) => ({
              ...prev, 
              notificationPreferences: { ...prev.notificationPreferences, sms: e.target.checked }
            }))} 
            className="h-5 w-5 text-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Notify by Email</label>
          <input 
            type="checkbox" 
            name="email" 
            checked={settings.notificationPreferences.email} 
            onChange={(e) => setSettings((prev) => ({
              ...prev, 
              notificationPreferences: { ...prev.notificationPreferences, email: e.target.checked }
            }))} 
            className="h-5 w-5 text-blue-600"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="text-right">
        <button 
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
          onClick={() => alert('Settings saved!')}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
