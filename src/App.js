import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PHQ9TestComponent from './components/PHQ9TestComponent';
import MoodTrackingComponent from './components/MoodTrackingComponent';
import VirtualCounselingComponent from './components/VirtualCounselingComponent';
import AnonymousChatComponent from './components/AnonymousChatComponent';
import ResourceDirectoryComponent from './components/ResourceDirectoryComponent';
import DashboardComponent from './components/DashboardComponent.js';
import './App.css';
import mental_health from './mental-health.png';
import Footer from './components/FooterComponent.js';
import LoginComponent from './components/LoginComponent';
import Chatbot from './components/ChatbotComponent.js';
import { BsFillChatDotsFill } from "react-icons/bs";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
    };

  if (!isAuthenticated) {
    return <LoginComponent onLogin={setIsAuthenticated} />;
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header flex gap-2">
          <img src={mental_health} className="h-8 w-50" alt="Mental Health Logo" />
          <h1 className="p-1 text-2xl font-bold">MindConnect</h1>
        </header>
        <nav className='mx-auto mt-5 border flex justify-center gap-3 max-w-[65vw]'>
          <Link to="/"><button>Dashboard</button></Link>
          <Link to="/phq9"><button>PHQ-9 Test</button></Link>
          <Link to="/mood-tracker"><button>Mood Tracker</button></Link>
          <Link to="/virtual-counseling"><button>Virtual Counseling</button></Link>
          <Link to="/anonymous-chat"><button>Anonymous Chat</button></Link>
          <Link to="/resource-directory"><button>Resource Directory</button></Link>
        </nav>

        <main className="App-main">
          <Routes>
            <Route path="/" element={<DashboardComponent />} />
            <Route path="/phq9" element={<PHQ9TestComponent />} />
            <Route path="/mood-tracker" element={<MoodTrackingComponent />} />
            <Route path="/virtual-counseling" element={<VirtualCounselingComponent />} />
            <Route path="/anonymous-chat" element={<AnonymousChatComponent />} />
            <Route path="/resource-directory" element={<ResourceDirectoryComponent />} />
          </Routes>
        </main>
        <BsFillChatDotsFill onClick={toggleChatbot} className=" border-2 p-1 border-black rounded-full fixed bottom-5 right-5 text-5xl text-blue-900 cursor-pointer transition-transform transform hover:scale-110"/>
        {isChatbotOpen && (
                <div className="fixed bottom-16 right-5 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 overflow-auto max-h-[60vh]">
                    <Chatbot onClose={toggleChatbot} />
                </div>
            )}
        <Footer />
      </div>
    </Router>
  );
};

export default App;