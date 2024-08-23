import React, { useState } from 'react';

function InquiryForm() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // State to manage the list of messages

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      setMessages([message, ...messages]); // Add new message to the top of the list
      setMessage(''); // Clear the message input field
    }
  };

  return (
    <div className="container mx-auto p-6 bg-[#FFFFFF] shadow-lg rounded-lg max-w-lg">
      <h1 className="text-2xl font-bold mb-4 text-[#032539]">Submit Your Inquiry</h1>
      
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
