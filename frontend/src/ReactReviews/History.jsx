// src/History.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Sample data (replace this with your data fetching logic)
const sampleReviews = [
  {
    id: 1,
    itemName: 'Yellow Sofa',
    rating: 4,
    comment: 'Great sofa, very comfortable!',
    photos: ['https://images.unsplash.com/photo-1523217582562-f2b080d96c29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'],
    video: null,
  },
  {
    id: 2,
    itemName: 'Wooden Cabinet',
    rating: 5,
    comment: 'Excellent quality and worth the price.',
    photos: [],
    video: 'https://www.example.com/sample-video.mp4',
  },
  {
    id: 3,
    itemName: 'Red Sofa',
    rating: 3,
    comment: 'The color was a bit different from the picture.',
    photos: ['https://images.unsplash.com/photo-1501213728777-7000c17f3231?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'],
    video: null,
  }
];

export default function History() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching data
    setReviews(sampleReviews);
  }, []);

  const handleEditClick = (reviewId) => {
    navigate(`/edit-review/${reviewId}`); // Navigate to the Edit Review page with the review ID
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Review History</h1>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 bg-white shadow-md rounded-md">
            <h2 className="text-lg font-semibold">{review.itemName}</h2>
            <div className="flex items-center mb-2">
              <span className="text-yellow-500">Rating: {review.rating} / 5</span>
            </div>
            <p className="text-gray-700 mb-2">{review.comment}</p>
            {review.photos.length > 0 && (
              <div className="mb-2">
                {review.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Review Photo ${index}`}
                    className="w-32 h-32 object-cover rounded-md mr-2"
                  />
                ))}
              </div>
            )}
            {review.video && (
              <div className="mb-2">
                <video
                  src={review.video}
                  controls
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            )}
            <button
              onClick={() => handleEditClick(review.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit My Review
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
