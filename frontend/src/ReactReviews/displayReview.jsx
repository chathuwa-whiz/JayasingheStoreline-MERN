import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Inquiries Section */}
      <div className="bg-[#FFFFFF] shadow-lg rounded-lg overflow-hidden">
        <div className="bg-[#032539] text-[#FFFFFF] p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Inquiries</h2>
          <div className="w-6 h-6 bg-[#1C768F] rounded-full"></div>
        </div>
        <div className="p-4">
          <div className="relative">
            <div className="absolute inset-0 grid grid-cols-5 gap-y-2 text-[#032539]">
              {[20, 15, 10, 5, 0].map((label) => (
                <div key={label} className="flex items-center justify-center">
                  <span className="text-xs">{label}</span>
                </div>
              ))}
            </div>
            <div className="relative bg-[#E0F7FA] border border-[#1C768F] rounded-md">
              <div className="grid grid-rows-5 gap-y-2">
                {[...Array(5).keys()].map((i) => (
                  <div key={i} className="bg-[#E0F7FA] border-t border-[#1C768F]"></div>
                ))}
              </div>
              <div className="flex justify-between text-[#032539] mt-4">
                {['Week #1', 'Week #2', 'Week #3', 'Week #4'].map((label, index) => (
                  <div key={index} className="text-xs">{label}</div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  {[...Array(7).keys()].map((i) => (
                    <div key={i} className="w-2.5 h-2.5 bg-[#1C768F]" style={{ position: 'absolute', top: `${i * 20}%`, left: `${i * 10}%` }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-[#032539] rounded-full"></div>
              <span className="text-sm text-[#032539]">This Month</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-[#FA991C] rounded-full"></div>
              <span className="text-sm text-[#032539]">Last Month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-[#FFFFFF] shadow-lg rounded-lg overflow-hidden">
        <div className="bg-[#032539] text-[#FFFFFF] p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Reviews</h2>
          <div className="w-6 h-6 bg-[#1C768F] rounded-full"></div>
        </div>
        <div className="p-4">
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {reviews.length === 0 && !loading && !error && <p>No reviews available.</p>}
          {reviews.map((review) => (
            <div key={review._id} className="mb-6 p-4 border-b border-gray-300">
              <div className="mb-2">
                <strong>Rating:</strong> {review.rating} / 5
              </div>
              <div className="mb-2">
                <strong>Comment:</strong> {review.comment}
              </div>
              {review.photos.length > 0 && (
                <div className="mb-2">
                  <strong>Photos:</strong>
                  <div className="flex space-x-2 mt-2">
                    {review.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Review photo ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    ))}
                  </div>
                </div>
              )}
              {review.video && (
                <div className="mb-2">
                  <strong>Video:</strong>
                  <div className="mt-2">
                    <video
                      src={review.video}
                      controls
                      className="w-full h-40 object-cover rounded-md"
                    />
                  </div>
                </div>
              )}
              <div className="mt-4">
                <strong>Additional Feedback:</strong>
                <ul className="list-disc list-inside">
                  {Object.entries(review.checkboxes).map(([key, value]) =>
                    value ? <li key={key}>{key.replace(/([A-Z])/g, ' $1')}</li> : null
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
