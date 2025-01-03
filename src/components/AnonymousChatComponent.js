import React, { useState, useEffect, useRef ,useContext} from 'react';
import { db, auth } from '../firebase.js';
import { AuthContext } from '../Authcontext.js';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  where
} from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';

const AnonymousChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomId, setRoomId] = useState(null);
  const [userId, setUserId] = useState(null);
  const messagesEndRef = useRef(null);
  const textBoxRef=useRef(null)
  const {user}=useContext(AuthContext)
  // Scroll to bottom whenever messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize anonymous auth and create/join chat room
  useEffect(() => {
    const initializeChat = async () => {
      try {
        // Sign in anonymously
        
        setUserId(user.uid);

        // For this example, we'll use a single chat room
        // You could modify this to create different rooms
        setRoomId('public-chat');

        // Subscribe to messages
        const q = query(
          collection(db, 'messages'),
          where('roomId', '==', 'public-chat'),
          orderBy('timestamp', 'asc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const messageList = [];
          snapshot.forEach((doc) => {
            messageList.push({ id: doc.id, ...doc.data() });
          });
          setMessages(messageList);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    initializeChat();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;

    try {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        userId: userId,
        roomId: roomId,
        timestamp: serverTimestamp(),
        isBot: false
      });
      console.log("done")
      setNewMessage('');

      // Simulate bot response (you can replace this with actual bot logic)
      

    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="px-6 py-4 bg-gray-800 rounded-t-lg">
        <h2 className="text-xl font-semibold text-white">Anonymous Chat</h2>
        <p className="text-gray-300 text-sm">Chat freely and safely</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${
              message.userId === userId ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.isBot
                  ? 'bg-gray-200 text-gray-800'
                  : message.userId === userId
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-800'
              }`}
            >
              <p>{message.text}</p>
              <span className="text-xs opacity-70">
                {message.timestamp?.toDate().toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            ref={textBoxRef}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="textbox flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};


export default AnonymousChatComponent;
