import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [comments, setComments] = useState([
    {
      id: 'AC1002',
      username: 'acc.24',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nibh ac tempor aliquam, elit quam eleifend lectus, at imperdiet augue diam sed diam. Maecenas quis ligula elit. Donec id magna et felis ultrices ultricies. Nulla facilisi. Nulla facilisi.',
    },
    {
      id: 'AC1003',
      username: 'acc.24',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nibh ac tempor aliquam, elit quam eleifend lectus, at imperdiet augue diam sed diam. Maecenas quis ligula elit. Donec id magna et felis ultrices ultricies. Nulla facilisi. Nulla facilisi.',
    },
    {
      id: 'AC1004',
      username: 'acc.24',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nibh ac tempor aliquam, elit quam eleifend lectus, at imperdiet augue diam sed diam. Maecenas quis ligula elit. Donec id magna et felis ultrices ultricies. Nulla facilisi. Nulla facilisi.',
    },
  ]);

  const handleReplyClick = (id) => {
    navigate(`/reply/${id}`); // Navigate to ReplyPage with comment ID
  };

  return (
    <div className="container mx-auto p-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
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
              {comment.id}
            </div>
            <div className="text-gray-500 ml-2">
              @{comment.username}
            </div>
          </div>
          <p className="text-gray-700">{comment.content}</p>
          <button
            onClick={() => handleReplyClick(comment.id)} // Pass comment ID to the handler
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
