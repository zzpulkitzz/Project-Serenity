import React from 'react';
import Card from './CardComponent.js'
import titleimg from '../images.jpeg'

const DashboardComponent = () => {
  return (
    <div className='flex flex-col gap-10 items-center'>
      <div className='flex justify-between gap-20 max-w-[65vw]'>
        <div className='flex flex-col  justify-center gap-4 ml-10 max-w-[50vw]'>
          <h1 className='font-bold text-3xl'>Welcome to Your Mental Health Dashboard</h1>
          <h2 className='font-bold text-xl'>Empower Your Mental Health Journey</h2>
          <p class="para2">Welcome to a platform designed to help you take charge of your mental well-being. Whether you're looking for professional support, helpful resources, or self-care tools, we’re here to guide you every step of the way.
          </p>
        </div>
        <img src={titleimg} className='h-[25rem] w-[30rem]'/>
      </div>
     <div className='w-full bg bg-slate-200 p-5'>
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
