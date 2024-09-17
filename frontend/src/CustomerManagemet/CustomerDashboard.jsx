import React from 'react';
import { useGetUsersQuery } from '../redux/api/usersApiSlice';
import { Pie, Line } from 'react-chartjs-2';

export default function CustomerManagementDashboard() {

  // Fetch all users
  const { data: users, isLoading: usersLoading, isError: usersError } = useGetUsersQuery();

  if (usersLoading) return <div>Loading...</div>;
  if (usersError) return <div>Error</div>;

  // Example statistics data (you can replace these with real data if available)
  const loggedInUsers = users?.filter(user => user.isLoggedIn).length || 0;
  const totalVisitors = 10234; // Placeholder value for total website visitors
  const newRegistrations = 11; // New user registrations this month
  const avgSessionDuration = '5m 12s'; // Average session duration

  return (
    <div className="overflow-auto bg-gray-50 p-6 rounded-lg shadow-md">
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg text-center shadow-sm">
          <h2 className="text-4xl font-bold">{loggedInUsers}</h2>
          <p className="text-lg">Logged In Users</p>
          <p className="text-blue-600">+12% compared to last week</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg text-center shadow-sm">
          <h2 className="text-4xl font-bold">{totalVisitors.toLocaleString()}</h2>
          <p className="text-lg">Total Website Visitors</p>
          <p className="text-purple-600">+8% increase</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center shadow-sm">
          <h2 className="text-4xl font-bold">{newRegistrations}</h2>
          <p className="text-lg">New Registrations</p>
          <p className="text-green-600">+20% this month</p>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg text-center shadow-sm">
          <h2 className="text-2xl font-bold">{avgSessionDuration}</h2>
          <p className="text-lg">Avg. Session Duration</p>
          <p className="text-orange-600">Stable</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">User Engagement Over Time</h3>
          <div className="relative h-64">
            {/* <Line data={userEngagementData} /> */}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">User Demographics</h3>
          <div className="relative h-64 flex items-center justify-center">
            {/* <Pie data={userDemographicsData} /> */}
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Recent User Activities</h3>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Last Login</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {users?.slice(0, 5).map(user => (
              <tr key={user._id} className="text-center">
                <td className="border px-4 py-2">{user._id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{new Date(user.lastLogin).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{user.isLoggedIn ? 'Online' : 'Offline'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
