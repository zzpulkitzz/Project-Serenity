import React from 'react';
import Card from './CardComponent.js'
import titleimg from '../images.jpeg'

const DashboardComponent = () => {
  return (
    <div className='flex flex-col gap-10 items-center'>
      <div className='flex justify-start items-start gap-20 w-[100%] bg-[url("./banner.jpg")] h-[90vh] bg-custom bg-no-repeat bg-cover'>
        <div className='flex flex-col  justify-start gap-4 ml-20 max-w-[38vw] transition linear slide-in mt-[100px]  text-pink-500 '>
          <h1 className='font-bold text-6xl'>Welcome to Your Mental Health Dashboard</h1>
          <h2 className='font-bold text-4xl mt-4 ' >Empower Your Mental Health Journey</h2>
          
        </div>
        
      </div>
     <div className='w-full bg bg-blue-100 p-5'>
        <p className='mt-4 mb-5 font-bold text-2xl align-middle'>Our Salient Features</p>
        <Card />
     </div>
      {/* <ul>
        <li>Take the PHQ-9 Depression Test</li>
        <li>Track Sleep and Nutrition (Mood-Regulating Tools)</li>
        <li>Access Virtual Counseling</li>
        <li>Engage in Anonymous Peer Chat</li>
        <li>Explore the Resource Directory</li>
      </ul> */}
    </div>
  );
};

export default DashboardComponent;