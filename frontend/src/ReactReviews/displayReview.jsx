import React, { useEffect, useState } from 'react';

export default function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/reviews');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="review-list">
      <h2>Customer Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="review-item">
            <h3>Rating: {review.rating} stars</h3>
            <p>{review.comment}</p>
            {/* Display photos, video, and checkboxes if available */}
            {review.photos && review.photos.length > 0 && (
              <div>
                <h4>Photos:</h4>
                {review.photos.map((photo, i) => (
                  <img key={i} src={photo} alt={`Review photo ${i}`} />
                ))}
              </div>
            )}
            {review.video && (
              <div>
                <h4>Video:</h4>
                <video src={review.video} controls />
              </div>
            )}
            <div>
              <h4>Additional Feedback:</h4>
              <ul>
                {Object.entries(review.checkboxes).map(([key, value]) => (
                  value && <li key={key}>{key}</li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}
