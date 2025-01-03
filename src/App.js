import React, { useContext, useState } from 'react';
import {RouterProvider, createRoutesFromElements, createBrowserRouter, Routes, Route, Link, redirect, Outlet} from 'react-router-dom'
import PHQ9TestComponent from './components/PHQ9TestComponent';
import MoodTrackingComponent from './components/MoodTrackingComponent';
import VirtualCounselingComponent from './components/VirtualCounselingComponent';
import AnonymousChatComponent from './components/AnonymousChatComponent';
import ResourceDirectoryComponent from './components/ResourceDirectoryComponent';
import DashboardComponent from './components/DashboardComponent.js';
import {PrivateRoute} from './PrivateRoute';
import './App.css';
import mental_health from './mental-health.png';
import Footer from './components/FooterComponent.js';
import {LoginComponent} from './components/LoginComponent';
import Chatbot from './components/ChatbotComponent.js';
import { BsFillChatDotsFill } from "react-icons/bs";
import {AuthProvider,AuthContext} from "./Authcontext"
import { signOut } from 'firebase/auth';
import { auth } from './firebase'


function App() { 
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  


  const handleLogout = async () => {
    try {
      console.log("vdsv")
      setLoading(true);
      
      // Sign out from Firebase
      await signOut(auth);
      console.log("hey")
      // Optional: Clear any local storage
      localStorage.removeItem('userData');
      window.location.reload()
      // Navigate to login page
      
      
      
    } catch (error) {
      console.error('Logout error:', error);
      setError('Failed to log out');
    } finally {
      setLoading(false);
    }
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  // Move RootLayout inside App component to access the state
  const RootLayout = () => {
    const {user} = useContext(AuthContext);
    
    const uid = user?.uid || ''; 
    return (
      <div className="App ">
        <header className="App-header flex gap-2 justify-between">
          <div className="flex gap-2">
          <img src={mental_health} className="h-8 w-50" alt="Mental Health Logo" />
          <h1 className="p-1 text-2xl font-bold mt-0">MindConnect</h1>
          </div>
         
          {error && <div className="text-red-500">{error}</div>}
      <button
        onClick={handleLogout}
        disabled={loading}
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? 'Logging out...' : 'Logout'}
      </button>

        </header>
        
        <nav className='mt-5 border-2 rounded-xl flex flex-row justify-around  w-[80vw] m-auto px-[10px] bg-[rgb(40,44,52)] '>
          <Link to="/"><button>Dashboard</button></Link>
          <Link to={`/phq9?uid=${uid}`}><button>PHQ9</button></Link>
          <Link to={`/mood-tracker?uid=${uid}`}><button>Mood Tracker</button></Link>
          <Link to={`/virtual-counseling?uid=${uid}`}><button> Counseling</button></Link>
          <Link to={`/anonymous-chat?uid=${uid}`}><button>Chat-Room</button></Link>
          <Link to={`/resource-directory?uid=${uid}`}><button>Resources </button></Link>
        </nav>
  
        <main className="App-main">
          <Outlet />
        </main>
        <BsFillChatDotsFill 
          onClick={toggleChatbot} 
          className="border-2 p-1 border-black rounded-full fixed bottom-5 right-5 text-5xl text-blue-900 cursor-pointer transition-transform transform hover:scale-110"
        />
        {isChatbotOpen && (
          <div className="fixed bottom-16 right-5 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 overflow-auto max-h-[60vh]">
            <Chatbot onClose={toggleChatbot} />
          </div>
        )}
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="login" element={<LoginComponent onLogin />} />
      <Route path="/" element={<RootLayout />} >
        <Route index element={<DashboardComponent />} />
        
        <Route 
          path="phq9" 
         
          element={<PrivateRoute><PHQ9TestComponent /></PrivateRoute>}
        />
        <Route 
          path="mood-tracker" 
       
          element={<PrivateRoute><MoodTrackingComponent /></PrivateRoute>} 
        />
        <Route 
          path="virtual-counseling" 
      
          element={<PrivateRoute><VirtualCounselingComponent /></PrivateRoute>} 
        />
        <Route 
          path="anonymous-chat" 
         
          element={<PrivateRoute><AnonymousChatComponent /></PrivateRoute>} 
        />
        <Route 
          path="resource-directory"
         
          element={<PrivateRoute><ResourceDirectoryComponent /></PrivateRoute>} 
        />
      </Route>
      </Route>
    )
  );

  return <div><AuthProvider><RouterProvider router={router} />
  </AuthProvider>
    </div>
}

export default App;