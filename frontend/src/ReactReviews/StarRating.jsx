// src/StarRating.js

import React, { useState } from 'react';

const StarRating = ({ rating, onRatingChange }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-3xl ${
            star <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'
          }`}
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(rating)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;
