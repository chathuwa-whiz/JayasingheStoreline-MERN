import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ReplyPage() {
  const { id } = useParams(); // Get the comment ID from the URL
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState([]); // State to manage replies
  const navigate = useNavigate(); // For navigation

  // Sample comment data
  const comment = {
    id: id,
    username: 'acc.24',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nibh ac tempor aliquam, elit quam eleifend lectus, at imperdiet augue diam sed diam. Maecenas quis ligula elit. Donec id magna et felis ultrices ultricies. Nulla facilisi. Nulla facilisi.',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reply.trim() !== '') {
      // Update the replies state with the new reply
      setReplies([reply, ...replies]); // Prepend new reply
      setReply(''); // Clear the reply input
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#032539]">Reply to Comment {id}</h1>
      
      {/* Display the comment */}
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
          <div className="font-bold text-[#032539]">{comment.id}</div>
          <div className="text-gray-500 ml-2">@{comment.username}</div>
        </div>
        <p className="text-gray-700">{comment.content}</p>
      </div>

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
