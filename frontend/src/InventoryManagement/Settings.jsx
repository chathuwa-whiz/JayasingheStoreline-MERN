import React, { useState } from 'react';
import { Switch } from '@headlessui/react';

export default function SettingsPage() {
  // State for account settings
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phoneNumber, setPhoneNumber] = useState('+94 123 456 789');

  // State for notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  // State for security settings
  const [password, setPassword] = useState('');
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  // State for preferences
  const [darkMode, setDarkMode] = useState(false);

  // Handle form submission (placeholder for future functionality)
  const handleSaveChanges = () => {
    // In a real app, here you would send the updated data to the backend
    console.log('Account settings saved:', { fullName, email, phoneNumber });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Account Settings */}
        <section className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-xl font-bold mb-4">Account Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold">Full Name</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Email Address</label>
              <input
                type="email"
                className="w-full border rounded p-2"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Phone Number</label>
              <input
                type="tel"
                className="w-full border rounded p-2"
                placeholder="+94 123 456 789"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <button
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-500"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
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
              className={`${emailNotifications ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${emailNotifications ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white`}
              />
            </Switch>
          </div>
          <div className="flex items-center justify-between">
            <span>Push Notifications</span>
            <Switch
              checked={pushNotifications}
              onChange={setPushNotifications}
              className={`${pushNotifications ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${pushNotifications ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white`}
              />
            </Switch>
          </div>
        </section>

        {/* Security Settings */}
        <section className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-xl font-bold mb-4">Security Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold">Change Password</label>
              <input
                type="password"
                className="w-full border rounded p-2"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Two-Factor Authentication</label>
              <Switch
                checked={twoFactorAuth}
                onChange={setTwoFactorAuth}
                className={`${twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable 2FA</span>
                <span
                  className={`${twoFactorAuth ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white`}
                />
              </Switch>
            </div>
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
              className={`${darkMode ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable Dark Mode</span>
              <span
                className={`${darkMode ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white`}
              />
            </Switch>
          </div>
        </section>
      </main>
    </div>
  );
}
