import React, { useState } from 'react';
import {RouterProvider, createRoutesFromElements, createBrowserRouter, Routes, Route, Link, redirect, Outlet} from 'react-router-dom'
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

async function Auth(pathname){ 
  console.log("jbsvhbbsv")
  let login = localStorage.getItem('login') == null ? false : localStorage.getItem('login')
  login = (login === "false") ? false : true;
  
  if(login===false){
    console.log("e")
    const response = redirect(`/login?message=please login to continue&redirectTo=${pathname}`)
    return response  
  } else {
    return null
  }
}

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  // Move RootLayout inside App component to access the state
  const RootLayout = () => {
    return (
      <div className="App">
        <header className="App-header flex gap-2">
          <img src={mental_health} className="h-8 w-50" alt="Mental Health Logo" />
          <h1 className="p-1">FreeyourMind</h1>
          <div className='logout' onClick={()=>{
            localStorage.setItem('login',false);
            window.location.reload();
          }}>
              Log Out
          </div>

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
      <Route path="/" element={<RootLayout />} >
        <Route index element={<DashboardComponent />} />
        <Route path="login" element={<LoginComponent onLogin />} />
        <Route 
          path="phq9" 
          loader={async ({ request }) => {
            console.log("PHQ9 loader running");
            const pathname = new URL(request.url).pathname;
            return await Auth(pathname);
          }}
          element={<PHQ9TestComponent />}
        />
        <Route 
          path="mood-tracker" 
          loader={async ({ request }) => {
            console.log("PHQ9 loader running");
            const pathname = new URL(request.url).pathname;
            return await Auth(pathname);
          }} 
          element={<MoodTrackingComponent />} 
        />
        <Route 
          path="virtual-counseling" 
          loader={async ({ request }) => {
            console.log("PHQ9 loader running");
            const pathname = new URL(request.url).pathname;
            return await Auth(pathname);
          }}
          element={<VirtualCounselingComponent />} 
        />
        <Route 
          path="anonymous-chat" 
          loader={async ({ request }) => {
            console.log("PHQ9 loader running");
            const pathname = new URL(request.url).pathname;
            return await Auth(pathname);
          }}
          element={<AnonymousChatComponent />} 
        />
        <Route 
          path="resource-directory"
          loader={async ({ request }) => {
            console.log("PHQ9 loader running");
            const pathname = new URL(request.url).pathname;
            return await Auth(pathname);
          }}
          element={<ResourceDirectoryComponent />} 
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;