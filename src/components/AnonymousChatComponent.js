import React from 'react';
import { useState } from 'react';

const AnonymousChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, id: Date.now() }]);
      setInput('');
    }
  };

  return (
    <div className="chat-container p-10 max-w-[400px] flex flex-col mx-auto">
      <h2 className='font-bold text-2xl mb-10'>Anonymous Chat</h2>
      <div className="messages max-h-[300px] overflow-auto mb-10">
        {messages.map(message => (
          <div key={message.id} className="message p-5 border-r-2 border-green-300 mb-5 ">
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="chat-form flex gap-4 justify-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
         className='border pl-[9px]'/>
        <button type="submit" className='py-2 bg-[rgb(40,44,52)] text-white rounded-full'>Send</button>
      </form>
    </div>
  );
};


export default AnonymousChatComponent;
