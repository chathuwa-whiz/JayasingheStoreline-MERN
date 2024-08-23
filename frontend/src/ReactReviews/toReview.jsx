import React from 'react';
import { useNavigate } from 'react-router-dom';

function PurchasedItems() {
  const navigate = useNavigate();

  const handleReviewClick = () => {
    navigate('/reactreviews'); // Navigate to the React Reviews page
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Purchased Items</h1>
      <div className="grid grid-cols-2 gap-4">
        {/* Item 1 */}
        <div className="flex flex-col items-center">
          <img
            src="https://images.unsplash.com/photo-1523217582562-f2b080d96c29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            alt="Yellow Sofa"
            className="w-64 h-48 object-cover"
          />
          <div className="mt-4">
            <h2 className="text-lg font-medium">Yellow Sofa</h2>
            <p className="text-gray-600">Description of the sofa goes here.</p>
            <button
              onClick={handleReviewClick} // Add click handler
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Review and Rate
            </button>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex flex-col items-center">
          <img
            src="https://images.unsplash.com/photo-1517369909001-900e26933311?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            alt="Wooden Cabinet"
            className="w-64 h-48 object-cover"
          />
          <div className="mt-4">
            <h2 className="text-lg font-medium">Wooden Cabinet</h2>
            <p className="text-gray-600">Description of the cabinet goes here.</p>
            <button
              onClick={handleReviewClick} // Add click handler
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Review and Rate
            </button>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex flex-col items-center">
          <img
            src="https://images.unsplash.com/photo-1501213728777-7000c17f3231?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            alt="Red Sofa"
            className="w-64 h-48 object-cover"
          />
          <div className="mt-4">
            <h2 className="text-lg font-medium">Red Sofa</h2>
            <p className="text-gray-600">Description of the sofa goes here.</p>
            <button
              onClick={handleReviewClick} // Add click handler
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Review and Rate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchasedItems;
