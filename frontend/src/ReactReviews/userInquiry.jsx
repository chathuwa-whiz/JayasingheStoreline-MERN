import React, { useState } from 'react';
import axios from 'axios';  // Import Axios

function InquiryForm() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // State to manage the list of messages
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      try {
        // Make a POST request to the server with the inquiry message
        const response = await axios.post('http://localhost:4000/api/inquiryRoutes', { message });

        // Add new message to the top of the list
        setMessages([response.data.message, ...messages]); 
        setMessage(''); // Clear the message input field
        setSuccessMessage('Your inquiry has been submitted successfully!'); // Set success message
        setErrorMessage(''); // Clear any previous error message
        setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
      } catch (error) {
        setErrorMessage('There was an error submitting your inquiry. Please try again.'); // Set error message
        setTimeout(() => setErrorMessage(''), 3000); // Clear error message after 3 seconds
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-[#FFFFFF] shadow-lg rounded-lg max-w-lg">
      <h1 className="text-2xl font-bold mb-4 text-[#032539]">Submit Your Inquiry</h1>
      
      {/* Display success message */}
      {successMessage && (
        <div className="mb-4 p-4 bg-[#E3F2FD] text-[#032539] border border-[#1C768F] rounded-lg shadow-md">
          {successMessage}
        </div>
      )}

      {/* Display error message */}
      {errorMessage && (
        <div className="mb-4 p-4 bg-[#FFEBEE] text-[#D32F2F] border border-[#D32F2F] rounded-lg shadow-md">
          {errorMessage}
        </div>
      )}

      {/* Display submitted messages */}
      <div className="mb-6 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className="bg-[#E3F2FD] p-4 rounded-lg shadow-md">
            <p className="text-[#032539]">{msg}</p>
          </div>
        ))}
      </div>

      {/* Inquiry form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="message" className="block text-[#032539] font-medium mb-1">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
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
}

export default InquiryForm;
