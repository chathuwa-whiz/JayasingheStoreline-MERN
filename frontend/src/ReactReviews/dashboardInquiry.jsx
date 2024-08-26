import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function App() {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch comments (inquiries) from the server
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/inquiryRoutes');
        setComments(response.data); // Update state with fetched inquiries
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        // Log error details for debugging
        console.error('Error fetching comments:', err);
        setError('Failed to load comments.');
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handleReplyClick = (id) => {
    navigate(`/reply/${id}`); // Navigate to ReplyPage with comment ID
  };

  if (loading) return <p>Loading...</p>; // Display loading state
  if (error) return <p>{error}</p>; // Display error message

  return (
    <div className="container mx-auto p-4">
      {comments.map((comment) => (
        <div
          key={comment._id} // Use _id from MongoDB for unique key
          className="bg-[#FFFFFF] rounded-lg p-4 mb-4 shadow-md"
        >
          <div className="flex items-center mb-2">
            <div className="bg-[#FA991C] rounded-full p-2 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#032539]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6 0a2 2 0 11-4 0 2 2 0 014 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="font-bold text-[#032539]">
              {comment._id} {/* Display the unique ID */}
            </div>
            <div className="text-gray-500 ml-2">
              @{comment.username || 'unknown'} {/* Handle missing username */}
            </div>
          </div>
          <p className="text-gray-700">{comment.message}</p> {/* Display the message */}
          <button
            onClick={() => handleReplyClick(comment._id)} // Pass comment ID to the handler
            className="bg-[#1C768F] hover:bg-[#165A6D] text-[#FFFFFF] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Reply
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
