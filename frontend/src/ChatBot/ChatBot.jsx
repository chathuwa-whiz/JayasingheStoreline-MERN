import React, { useEffect } from 'react';

const ChatBot = () => {
  useEffect(() => {
    // Configure the embedded chatbot
    window.embeddedChatbotConfig = {
      chatbotId: "xw6aTziOiW80kcLTJF3e1",
      domain: "www.chatbase.co"
    };

    // Dynamically load the chat bot script after component mounts
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.setAttribute("chatbotId", "xw6aTziOiW80kcLTJF3e1");
    script.setAttribute("domain", "www.chatbase.co");
    script.defer = true; // Use defer to load the script after the document has been parsed

    document.body.appendChild(script);

    // Clean up the script tag on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

};

export default ChatBot;
