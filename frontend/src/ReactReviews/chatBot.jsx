import React, { useState } from 'react';

const suggestions = [
  'How many chairs?',
  'What is the brand?',
  'Tell me about the store.',
  'How can I contact support?',
  'What are your store hours?'
];

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSend = () => {
    if (input.trim() !== '') {
      // User message
      setMessages([...messages, { text: input, fromUser: true }]);
      setInput('');
      setFilteredSuggestions([]);
      setShowSuggestions(false);

      // Generate bot response
      let botResponse = '';
      if (input.toLowerCase().includes('how many chairs')) {
        botResponse = '5';
      } else if (input.toLowerCase().includes('brand')) {
        botResponse = 'Phenix';
      } else {
        botResponse = 'Sorry, I don’t understand that question.';
      }

      // Simulate bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponse, fromUser: false },
        ]);
      }, 1000);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    
    if (value.trim() === '') {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    } else {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="flex flex-col w-72 h-80 bg-gray-100 p-4 rounded-lg shadow-lg">
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.fromUser ? 'justify-end' : 'justify-start'} mb-2`}>
            <div
              className={`p-3 rounded-lg max-w-xs ${msg.fromUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="w-full p-2 border rounded-t-lg focus:outline-none"
          />
          {showSuggestions && (
            <ul className="absolute bg-white border border-gray-300 w-full mt-1 max-h-32 overflow-y-auto z-10">
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-2 rounded-b-lg hover:bg-blue-600 mt-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
