import React, { useState } from 'react';
import { FiVideo, FiCalendar, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const VirtualCounselingComponent = () => {
  const [appointment, setAppointment] = useState(false);

  const handleBookAppointment = () => {
    setAppointment(true); // Simulates booking confirmation
    toast.success("Appointment Booked Successfully");
  };

  return (
    <div className="virtual-counseling max-w-4xl mx-auto p-6">
      <ToastContainer/>
      <h2 className="text-3xl font-bold mb-6 text-center">Virtual Counseling</h2>

      {/* Counselor Directory */}
      <div className="counselor-list mb-8">
        <h3 className="text-2xl font-semibold mb-4">Available Counselors</h3>
        <ul className="list-none">
          <li className="flex items-center justify-between bg-gray-100 p-4 rounded-full mb-4">
            <div className="flex items-center">
              <FiUser className="mr-4 text-xl text-blue-500" />
              <div>
                <h4 className="text-lg font-bold">Dr. Emily Johnson</h4>
                <p className="text-gray-600">Licensed Therapist, 12+ years experience</p>
              </div>
            </div>
            <button
              onClick={handleBookAppointment}
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 flex items-center"
            >
              <FiCalendar className="mr-2" />
              Book Appointment
            </button>
          </li>
          <li className="flex items-center justify-between bg-gray-100 p-4 rounded-full mb-4">
            <div className="flex items-center">
              <FiUser className="mr-4 text-xl text-blue-500" />
              <div>
                <h4 className="text-lg font-bold">Dr. Andrew</h4>
                <p className="text-gray-600">Licensed Therapist, 10+ years experience</p>
              </div>
            </div>
            <button
              onClick={handleBookAppointment}
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 flex items-center"
            >
              <FiCalendar className="mr-2" />
              Book Appointment
            </button>
          </li>
          <li className="flex items-center justify-between bg-gray-100 p-4 rounded-full mb-4">
            <div className="flex items-center">
              <FiUser className="mr-4 text-xl text-blue-500" />
              <div>
                <h4 className="text-lg font-bold">Dr. Aakash Gupta</h4>
                <p className="text-gray-600">Licensed Therapist, 20+ years experience</p>
              </div>
            </div>
            <button
              onClick={handleBookAppointment}
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 flex items-center"
            >
              <FiCalendar className="mr-2" />
              Book Appointment
            </button>
          </li>
        </ul>
      </div>

      {/* Confirmation or Booking Form */}
      {appointment && (
        <div className="booking-confirmation bg-blue-100 p-4 rounded-lg mb-8">
          <h3 className="text-lg font-bold text-blue-700">Appointment Booked Successfully!</h3>
          <p>Your counseling session with Dr. Emily Johnson is scheduled. Check your email for further details.</p>
        </div>
      ) && (<div className="video-call mb-8">
        <h3 className="text-2xl font-semibold mb-4">Join Your Virtual Counseling Session</h3>
        <p className="mb-4 text-gray-600">Please click the button below to start your session:</p>
        <Link to="/start-counseling-session">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg mx-auto hover:bg-blue-600 flex items-center">
            <FiVideo className="mr-2" />
            Start Video Session
          </button>
        </Link>
      </div>)}

      {/* Video Call Interface (Simulated) */}
      
    </div>
  );
};

export default VirtualCounselingComponent;