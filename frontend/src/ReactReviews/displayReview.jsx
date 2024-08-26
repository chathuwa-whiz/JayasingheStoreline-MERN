import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StarRating from './StarRating'; // Import your StarRating component

function App() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/reviewRoutes');
        setReviews(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching reviews');
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Reviews Section */}
      <div className="bg-[#FFFFFF] shadow-lg rounded-lg overflow-hidden">
        <div className="bg-[#032539] text-[#FFFFFF] p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Reviews</h2>
          <div className="w-6 h-6 bg-[#1C768F] rounded-full"></div>
        </div>
        <div className="p-4">
          {reviews.length === 0 && !loading && !error && <p>No reviews available.</p>}
          {reviews.map((review) => (
            <div key={review._id} className="mb-6 p-4 border-b border-gray-300 bg-white shadow-md rounded-md">
              <h3 className="text-xl font-bold mb-2">Review ID: {review._id}</h3>
              <div className="mb-2">
                <StarRating rating={review.rating} />
              </div>
              <p className="text-gray-700 mb-2">{review.comment}</p>
              {review.photos && review.photos.length > 0 && (
                <div className="mb-2">
                  <strong>Photos:</strong>
                  <div className="flex space-x-2 mt-2">
                    {review.photos.map((photo, index) => (
                      <img key={index} src={photo} alt={`Review photo ${index + 1}`} className="w-24 h-24 object-cover rounded-md" />
                    ))}
                  </div>
                </div>
              )}
              {review.video && (
                <div className="mb-2">
                  <strong>Video:</strong>
                  <div className="mt-2">
                    <video src={review.video} controls className="w-full h-40 object-cover rounded-md" />
                  </div>
                </div>
              )}
              {Object.keys(review.checkboxes).length > 0 && (
                <div className="mt-2">
                  {Object.keys(review.checkboxes).map((key) => (
                    review.checkboxes[key] && (
                      <span key={key} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full mr-2">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
