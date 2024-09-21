import React, { useState } from 'react';
import { Switch } from '@headlessui/react';

export default function SettingsPage() {
  // State for the settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [autoConfirmOrders, setAutoConfirmOrders] = useState(false);
  const [exportFormat, setExportFormat] = useState('CSV');
  const [shippingMethod, setShippingMethod] = useState('Standard');
  const [darkMode, setDarkMode] = useState(false);

  // Handle Save Action
  const handleSaveSettings = () => {
    alert('Settings have been saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Order Settings</h2>

        {/* Account Settings */}
        <section className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-xl font-bold mb-4">Account Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold">Full Name</label>
              <input type="text" className="w-full border rounded p-2" placeholder="John Doe" />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Email Address</label>
              <input type="email" className="w-full border rounded p-2" placeholder="john.doe@example.com" />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Phone Number</label>
              <input type="tel" className="w-full border rounded p-2" placeholder="+94 123 456 789" />
            </div>
            <div>
              <button className="mt-6 bg-orange-600 text-white px-4 py-2 rounded shadow hover:bg-blue-500">
                Save Changes
              </button>
            </div>
          </div>
        </section>

        {/* Order Settings */}
        <section className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-xl font-bold mb-4">Order Settings</h3>
          <div className="flex items-center justify-between mb-4">
            <span>Auto-Confirm Orders</span>
            <Switch
              checked={autoConfirmOrders}
              onChange={setAutoConfirmOrders}
              className={`${
                autoConfirmOrders ? 'bg-orange-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable Auto-Confirmation</span>
              <span
                className={`${
                  autoConfirmOrders ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white`}
              />
            </Switch>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Default Shipping Method</label>
            <select
              value={shippingMethod}
              onChange={(e) => setShippingMethod(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Standard">Standard Shipping</option>
              <option value="Express">Express Shipping</option>
              <option value="Pickup">Pickup</option>
            </select>
          </div>
        </section>

        {/* Notification Settings */}
        <section className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-xl font-bold mb-4">Notification Settings</h3>
          <div className="flex items-center justify-between mb-4">
            <span>Email Notifications</span>
            <Switch
              checked={emailNotifications}
              onChange={setEmailNotifications}
              className={`${
                emailNotifications ? 'bg-orange-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable Email Notifications</span>
              <span
                className={`${
                  emailNotifications ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white`}
              />
            </Switch>
          </div>
          <div className="flex items-center justify-between">
            <span>Push Notifications</span>
            <Switch
              checked={pushNotifications}
              onChange={setPushNotifications}
              className={`${
                pushNotifications ? 'bg-orange-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable Push Notifications</span>
              <span
                className={`${
                  pushNotifications ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white`}
              />
            </Switch>
          </div>
        </section>

        {/* Export Settings */}
        <section className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-xl font-bold mb-4">Export Settings</h3>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Order Export Format</label>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="CSV">CSV</option>
              <option value="Excel">Excel</option>
              <option value="PDF">PDF</option>
            </select>
          </div>
        </section>

        {/* Preferences */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Preferences</h3>
          <div className="flex items-center justify-between mb-4">
            <span>Dark Mode</span>
            <Switch
              checked={darkMode}
              onChange={setDarkMode}
              className={`${
                darkMode ? 'bg-orange-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable Dark Mode</span>
              <span
                className={`${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white`}
              />
            </Switch>
          </div>
        </section>

        {/* Save Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleSaveSettings}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600"
          >
            Save Settings
          </button>
        </div>
      </main>
    </div>
  );
}
