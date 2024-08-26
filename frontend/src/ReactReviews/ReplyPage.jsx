import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ReplyPage() {
  const { id } = useParams(); // This is the inquiry ID
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState([]);
  const [inquiry, setInquiry] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/inquiryRoutes/${id}`);
        setInquiry(response.data);
      } catch (err) {
        console.error('Error fetching inquiry:', err);
        setError('Failed to load inquiry.');
      }
    };

    const fetchReplies = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/replyRoutes/${id}`);
        setReplies(response.data);
      } catch (err) {
        console.error('Error fetching replies:', err);
        setError('Failed to load replies.');
      }
    };

    fetchInquiry();
    fetchReplies();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reply.trim() !== '') {
      try {
        // Post the new reply
        const response = await axios.post(`http://localhost:4000/api/replyRoutes/${id}`, { replyText: reply });
        
        // Option 1: Refetch all replies
        // const repliesResponse = await axios.get(`http://localhost:4000/api/replyRoutes/${id}`);
        // setReplies(repliesResponse.data);

        // Option 2: Use the newly created reply from the response
        setReplies([response.data, ...replies]);

        // Clear the input and display success message
        setReply('');
        setSuccess('Reply submitted successfully!');
        setError('');

        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        console.error('Error submitting reply:', err);
        setError('Failed to submit reply. Please try again.');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#032539]">Reply to Inquiry {id}</h1>
      
      {success && (
        <div className="mb-4 p-4 bg-[#E3F2FD] text-[#032539] border border-[#1C768F] rounded-lg shadow-md">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-[#FFEBEE] text-[#D32F2F] border border-[#D32F2F] rounded-lg shadow-md">
          {error}
        </div>
      )}

      {inquiry && (
        <div className="bg-[#E3F2FD] p-4 rounded-lg shadow-md mb-4">
          <p className="text-[#032539]">{inquiry.message}</p>
        </div>
      )}

      <div className="mb-6 space-y-4">
        {replies.map((reply) => (
          <div key={reply._id} className="bg-[#E0F7FA] p-2 rounded-lg mb-2">
            <p className="text-[#032539]">{reply.replyText}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="reply" className="block text-[#032539] font-medium mb-1">Reply</label>
          <textarea
            id="reply"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Your Reply"
            rows="4"
            className="w-full p-3 border border-[#1C768F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FA991C]"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-[#FA991C] text-[#FFFFFF] font-semibold rounded-lg hover:bg-[#F57C00] transition-colors"
        >
          Submit Reply
        </button>
      </form>
    </div>
  );
}

export default ReplyPage;
