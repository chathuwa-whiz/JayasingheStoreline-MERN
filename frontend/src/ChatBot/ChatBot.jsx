import React, { useEffect } from 'react';

const ChatBot = () => {
  useEffect(() => {
    // Dynamically load the chat bot script after component mounts
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.async = true;
    script.setAttribute("chatbotId", "EJzcoHdHXVPjWkEP2MAN0");
    script.setAttribute("domain", "www.chatbase.co");

    document.body.appendChild(script);

    // Clean up the script tag on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);


};

export default ChatBot;
