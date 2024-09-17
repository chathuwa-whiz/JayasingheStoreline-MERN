// SettingsPage.jsx
import React from 'react';
import { Switch } from '@headlessui/react'; // For toggle switches, install Headless UI if not already installed

export default function SettingsPage() {
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
              <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-500">
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
              checked={true}
              className={`${
                true ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  true ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white`}
              />
            </Switch>
          </div>
          <div className="flex items-center justify-between">
            <span>Push Notifications</span>
            <Switch
              checked={false}
              className={`${
                false ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  false ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white`}
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
              <input type="password" className="w-full border rounded p-2" placeholder="New Password" />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Two-Factor Authentication</label>
              <Switch
                checked={false}
                className={`${
                  false ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable 2FA</span>
                <span
                  className={`${
                    false ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white`}
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
              checked={false}
              className={`${
                false ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable Dark Mode</span>
              <span
                className={`${
                  false ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white`}
              />
            </Switch>
          </div>
        </section>
      </main>
    </div>
  );
}
