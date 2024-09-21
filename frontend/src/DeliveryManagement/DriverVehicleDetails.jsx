import React, { useState, useEffect } from 'react';
import { useGetDriversQuery, useCreateDriverMutation, useUpdateDriverMutation, useDeleteDriverMutation } from '../redux/api/driverApiSlice';
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const DriverVehicleDetails = () => {
  const { data: apiDrivers, refetch } = useGetDriversQuery();
  const [createDriver] = useCreateDriverMutation();
  const [updateDriver] = useUpdateDriverMutation();
  const [deleteDriver] = useDeleteDriverMutation();

  const dummyDrivers = [
    {
      _id: '1',
      nic: '199012345678',
      name: 'John Doe',
      dob: '1990-05-15',
      telephoneNo: '0771234567',
      vehicle: 'Toyota',
      vehicleNo: 'ABD-4569',
      drivingLicense: 'B5654789'
    },
    {
      _id: '2',
      nic: '198765432109',
      name: 'Jane Smith',
      dob: '1985-11-30',
      telephoneNo: '0789876543',
      vehicle: 'Honda',
      vehicleNo: 'CAC-7895',
      drivingLicense: 'A1234567'
    },
    {
      _id: '3',
      nic: '199234567890',
      name: 'Michael Johnson',
      dob: '1995-02-20',
      telephoneNo: '0712345678',
      vehicle: 'Suzuki',
      vehicleNo: 'XYZ-1234',
      drivingLicense: 'C9876543'
    },
    {
      _id: '4',
      nic: '198012345678',
      name: 'Emily Davis',
      dob: '1980-07-22',
      telephoneNo: '0759876543',
      vehicle: 'Nissan',
      vehicleNo: 'DEF-5678',
      drivingLicense: 'D6543210'
    },
    {
      _id: '5',
      nic: '199112345678',
      name: 'Chris Brown',
      dob: '1991-03-15',
      telephoneNo: '0791234567',
      vehicle: 'Ford',
      vehicleNo: 'GHI-4321',
      drivingLicense: 'E1234567'
    },
    {
      _id: '6',
      nic: '198512345678',
      name: 'Olivia Wilson',
      dob: '1985-09-05',
      telephoneNo: '0734567890',
      vehicle: 'Chevrolet',
      vehicleNo: 'JKL-8765',
      drivingLicense: 'F5678901'
    },
    {
      _id: '7',
      nic: '199312345678',
      name: 'James Taylor',
      dob: '1993-12-10',
      telephoneNo: '0745678901',
      vehicle: 'Kia',
      vehicleNo: 'MNO-2345',
      drivingLicense: 'G2345678'
    },
    {
      _id: '8',
      nic: '198712345678',
      name: 'Sophia Miller',
      dob: '1987-04-01',
      telephoneNo: '0786789012',
      vehicle: 'Mazda',
      vehicleNo: 'PQR-6789',
      drivingLicense: 'H1234567'
    },
    {
      _id: '9',
      nic: '199212345678',
      name: 'David Garcia',
      dob: '1992-06-30',
      telephoneNo: '0723456789',
      vehicle: 'Subaru',
      vehicleNo: 'STU-3456',
      drivingLicense: 'I9876543'
    },
    {
      _id: '10',
      nic: '198212345678',
      name: 'Isabella Martinez',
      dob: '1982-08-15',
      telephoneNo: '0778901234',
      vehicle: 'Volkswagen',
      vehicleNo: 'VWX-5432',
      drivingLicense: 'J7654321'
    }
  ];
  
  

  const drivers = apiDrivers || dummyDrivers;

  const [newDriver, setNewDriver] = useState({
    nic: '',
    name: '',
    dob: '',
    telephoneNo: '',
    vehicle: '',
    vehicleNo: '',
    drivingLicense: ''
  });

  const [editingDriver, setEditingDriver] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const validateForm = () => {
    const { nic, name, dob, telephoneNo, vehicle, vehicleNo, drivingLicense } = newDriver;
    const nicRegex = /^[0-9]{12}$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const telephoneRegex = /^[0-9]{10}$/;
    const vehicleRegex = /^[A-Za-z\s]+$/;
    const vehicleNoRegex = /^[A-Za-z0-9\s]+$/;
    const drivingLicenseRegex = /^[0-9]{8}$/;

    const currentYear = new Date().getFullYear();
    const birthYear = new Date(dob).getFullYear();

    if (!nicRegex.test(nic)) {
      setMessage({ type: 'error', text: 'NIC must be exactly 12 digits' });
      return false;
    }
    if (!nameRegex.test(name)) {
      setMessage({ type: 'error', text: 'Name must contain only letters' });
      return false;
    }
    if (birthYear > 2005 || birthYear < 1969) {
      setMessage({ type: 'error', text: 'Driver must be born between 1969 and 2005' });
      return false;
    }
    if (!telephoneRegex.test(telephoneNo)) {
      setMessage({ type: 'error', text: 'Telephone number must be exactly 10 digits' });
      return false;
    }
    if (!vehicleRegex.test(vehicle)) {
      setMessage({ type: 'error', text: 'Vehicle must contain only letters' });
      return false;
    }
    if (!vehicleNoRegex.test(vehicleNo)) {
      setMessage({ type: 'error', text: 'Vehicle number must contain letters and numbers' });
      return false;
    }
    if (!drivingLicenseRegex.test(drivingLicense)) {
      setMessage({ type: 'error', text: 'Driving License must be exactly 8 digits' });
      return false;
    }
    return true;
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingDriver) {
        await updateDriver({ id: editingDriver._id, ...newDriver }).unwrap();
        setMessage({ type: 'success', text: 'Driver updated successfully' });
      } else {
        await createDriver(newDriver).unwrap();
        setMessage({ type: 'success', text: 'Driver added successfully' });
      }
      setNewDriver({ nic: '', name: '', dob: '', telephoneNo: '', vehicle: '', vehicleNo: '', drivingLicense: '' });
      setEditingDriver(null);
      refetch();
    } catch (error) {
      setMessage({ type: 'error', text: editingDriver ? 'Update unsuccessful. Please try again.' : 'Adding unsuccessful. Please try again.' });
    }
  };

  const handleEdit = (driver) => {
    setEditingDriver(driver);
    setNewDriver({
      nic: driver.nic,
      name: driver.name,
      dob: driver.dob,
      telephoneNo: driver.telephoneNo,
      vehicle: driver.vehicle,
      vehicleNo: driver.vehicleNo,
      drivingLicense: driver.drivingLicense,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this driver?')) {
      try {
        await deleteDriver(id).unwrap();
        setMessage({ type: 'success', text: 'Driver deleted successfully' });
        refetch();
      } catch (error) {
        setMessage({ type: 'error', text: 'Delete unsuccessful. Please try again.' });
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingDriver(null);
    setNewDriver({ nic: '', name: '', dob: '', telephoneNo: '', vehicle: '', vehicleNo: '', drivingLicense: '' });
  };

  const handleInputChange = (e, field, maxLength) => {
    const value = e.target.value;
    if (value.length <= maxLength && /^[0-9]*$/.test(value)) {
      setNewDriver({ ...newDriver, [field]: value });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="border rounded-lg p-6 bg-gray-50 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">{editingDriver ? 'Edit Driver' : 'Add New Driver'}</h2>
        <form onSubmit={handleCreateOrUpdate}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* NIC */}
            <div>
              <label htmlFor="nic" className="block text-sm font-medium text-gray-700">NIC</label>
              <input
                type="text"
                id="nic"
                value={newDriver.nic}
                onChange={(e) => handleInputChange(e, 'nic', 12)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                maxLength={12}
                required
              />
            </div>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={newDriver.name}
                onChange={(e) => /^[A-Za-z\s]*$/.test(e.target.value) && setNewDriver({ ...newDriver, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            {/* Date of Birth */}
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                id="dob"
                value={newDriver.dob}
                onChange={(e) => setNewDriver({ ...newDriver, dob: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                min="1969-01-01"
                max="2005-12-31"
                required
              />
            </div>
            {/* Telephone Number */}
            <div>
              <label htmlFor="telephoneNo" className="block text-sm font-medium text-gray-700">Telephone Number</label>
              <input
                type="text"
                id="telephoneNo"
                value={newDriver.telephoneNo}
                onChange={(e) => handleInputChange(e, 'telephoneNo', 10)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                maxLength={10}
                required
              />
            </div>
            {/* Vehicle */}
            <div>
              <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">Vehicle</label>
              <input
                type="text"
                id="vehicle"
                value={newDriver.vehicle}
                onChange={(e) => /^[A-Za-z\s]*$/.test(e.target.value) && setNewDriver({ ...newDriver, vehicle: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            {/* Vehicle Number */}
            <div>
              <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">Vehicle Number</label>
              <input
                type="text"
                id="vehicleNo"
                value={newDriver.vehicleNo}
                onChange={(e) => /^[A-Za-z0-9\s]*$/.test(e.target.value) && setNewDriver({ ...newDriver, vehicleNo: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            {/* Driving License */}
            <div>
              <label htmlFor="drivingLicense" className="block text-sm font-medium text-gray-700">Driving License</label>
              <input
                type="text"
                id="drivingLicense"
                value={newDriver.drivingLicense}
                onChange={(e) => handleInputChange(e, 'drivingLicense', 8)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                maxLength={8}
                required
              />
            </div>
          </div>
          <div className="mt-6">
            {message.text && (
              <div className={`mb-4 ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                {message.type === 'success' ? <FaCheckCircle /> : <FaTimesCircle />}
                <span className="ml-2">{message.text}</span>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              {editingDriver && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {editingDriver ? 'Update Driver' : 'Add Driver'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Driver List */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Driver Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">NIC</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">DOB</th>
                <th className="py-2 px-4 border-b">Telephone No</th>
                <th className="py-2 px-4 border-b">Vehicle</th>
                <th className="py-2 px-4 border-b">Vehicle No</th>
                <th className="py-2 px-4 border-b">Driving License</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver._id}>
                  <td className="py-2 px-4 border-b">{driver.nic}</td>
                  <td className="py-2 px-4 border-b">{driver.name}</td>
                  <td className="py-2 px-4 border-b">{new Date(driver.dob).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{driver.telephoneNo}</td>
                  <td className="py-2 px-4 border-b">{driver.vehicle}</td>
                  <td className="py-2 px-4 border-b">{driver.vehicleNo}</td>
                  <td className="py-2 px-4 border-b">{driver.drivingLicense}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleEdit(driver)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(driver._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded ml-2"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DriverVehicleDetails;
