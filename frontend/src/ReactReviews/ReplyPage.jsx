import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ReplyPage() {
  const { id } = useParams(); // Get the comment ID from the URL
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState([]); // State to manage replies
  const [inquiry, setInquiry] = useState(null); // State to hold the fetched inquiry
  const [error, setError] = useState(''); // State to hold error messages
  const [success, setSuccess] = useState(''); // State to hold success messages
  const navigate = useNavigate(); // For navigation

  // Fetch the inquiry data when the component mounts
  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/inquiryRoutes/${id}`);
        setInquiry(response.data); // Update state with fetched inquiry
      } catch (err) {
        console.error('Error fetching inquiry:', err);
        setError('Failed to load inquiry.');
      }
    };

    fetchInquiry();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reply.trim() !== '') {
      try {
        // Optionally, send the reply to the server here
        // Uncomment and adjust the URL based on your server endpoint
        // await axios.post(`http://localhost:3000/api/replies/${id}`, { reply });
        
        // Update the replies state with the new reply
        setReplies([reply, ...replies]); // Prepend new reply
        setReply(''); // Clear the reply input
        setSuccess('Reply submitted successfully!'); // Set success message
        setError(''); // Clear any previous error message
        setTimeout(() => setSuccess(''), 3000); // Clear success message after 3 seconds
      } catch (err) {
        console.error('Error submitting reply:', err);
        setError('Failed to submit reply. Please try again.'); // Set error message
        setTimeout(() => setError(''), 3000); // Clear error message after 3 seconds
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#032539]">Reply to Comment {id}</h1>
      
      {/* Display success message if any */}
      {success && (
        <div className="mb-4 p-4 bg-[#E3F2FD] text-[#032539] border border-[#1C768F] rounded-lg shadow-md">
          {success}
        </div>
      )}

      {/* Display error message if any */}
      {error && (
        <div className="mb-4 p-4 bg-[#FFEBEE] text-[#D32F2F] border border-[#D32F2F] rounded-lg shadow-md">
          {error}
        </div>
      )}

      {/* Display the fetched inquiry */}
      {inquiry && (
        <div className="bg-[#FFFFFF] p-4 rounded-lg mb-4 shadow-md">
          <div className="flex items-center mb-2">
            <div className="bg-[#FA991C] rounded-full p-2 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#FFFFFF]"
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
            <div className="font-bold text-[#032539]">{inquiry._id}</div>
          </div>
          <p className="text-gray-700">{inquiry.message}</p>
        </div>
      )}

      {/* Display existing replies */}
      <div className="mb-4">
        {replies.map((reply, index) => (
          <div key={index} className="bg-[#E0F7FA] p-4 rounded-lg mb-2">
            <p className="text-[#032539]">{reply}</p>
          </div>
        ))}
      </div>

      {/* Reply form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Type your reply..."
          className="w-full p-2 border rounded border-[#1C768F] text-[#032539]"
          rows="6"
        />
        <button
          type="submit"
          className="bg-[#1C768F] text-[#FFFFFF] px-4 py-2 rounded hover:bg-[#165A6D]"
        >
          Submit Reply
        </button>
      </form>
    </div>
  );
}

export default ReplyPage;
