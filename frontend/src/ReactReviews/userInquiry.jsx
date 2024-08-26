import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const UserInquiry = () => {
  const { userId } = useParams();
  const [inquiries, setInquiries] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchInquiries = async () => {
      console.log(`Fetching inquiries for userId: ${userId}`); // Debugging log
      try {
        const response = await axios.get(`http://localhost:4000/api/inquiryRoutes/user/${userId}`);
        console.log('Inquiries response:', response.data); // Debugging log
        setInquiries(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching inquiries:', err.response ? err.response.data : err.message);
        setError('Failed to load inquiries.');
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:4000/api/inquiryRoutes', { message, userId });
        setInquiries([response.data, ...inquiries]);  // Update the inquiries list
        setMessage('');
        setSuccessMessage('Your inquiry has been submitted successfully!');
        setError('');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        console.error('Error submitting inquiry:', err);
        setError('There was an error submitting your inquiry. Please try again.');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6 bg-[#FFFFFF] shadow-lg rounded-lg max-w-lg">
      <h1 className="text-2xl font-bold mb-4 text-[#032539]">User Inquiries</h1>

      {successMessage && (
        <div className="mb-4 p-4 bg-[#E3F2FD] text-[#032539] border border-[#1C768F] rounded-lg shadow-md">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-[#FFEBEE] text-[#D32F2F] border border-[#D32F2F] rounded-lg shadow-md">
          {error}
        </div>
      )}

      {inquiries.length === 0 ? (
        <p className="text-gray-500">No inquiries found for this user.</p>
      ) : (
        inquiries.map((inquiry) => (
          <div key={inquiry._id} className="bg-[#E3F2FD] p-4 rounded-lg shadow-md mb-4">
            <p className="text-[#032539]">{inquiry.message}</p>
            <div className="mt-4">
              {inquiry.replies && inquiry.replies.map((reply) => (
                <div key={reply._id} className="bg-[#E0F7FA] p-2 rounded-lg mb-2">
                  <p className="text-[#032539]">{reply.replyText}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div>
          <label htmlFor="message" className="block text-[#032539] font-medium mb-1">New Inquiry</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message here..."
            rows="4"
            className="w-full p-3 border border-[#1C768F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FA991C]"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-[#FA991C] text-[#FFFFFF] font-semibold rounded-lg hover:bg-[#F57C00] transition-colors"
        >
          Submit Inquiry
        </button>
      </form>
    </div>
  );
};

export default UserInquiry;
