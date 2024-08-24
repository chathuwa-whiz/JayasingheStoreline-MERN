// src/components/StarRating.jsx
import React from 'react';

const StarRating = ({ rating, onRatingChange }) => {
  // Generate an array of 5 stars
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex">
      {stars.map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          fill={star <= rating ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`w-6 h-6 cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
          onClick={() => onRatingChange && onRatingChange(star)} // Optional: Trigger a callback on click
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11.049 2.927C11.188 2.679 11.476 2.5 11.779 2.5c.302 0 .591.179.73.427l2.052 4.178 4.6.664c.288.041.556.239.674.514.118.275.062.585-.153.787l-3.332 3.247.787 4.59c.046.274-.057.566-.26.746-.204.181-.477.261-.743.207l-4.1-1.056-4.1 1.056c-.266.054-.539-.026-.743-.207-.204-.181-.306-.472-.26-.746l.787-4.59-3.332-3.247c-.215-.202-.271-.512-.153-.787.118-.275.386-.473.674-.514l4.6-.664 2.052-4.178z"
          />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
