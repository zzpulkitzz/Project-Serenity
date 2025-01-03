import React from 'react';
import { LuNewspaper } from "react-icons/lu";
import { MdMood } from "react-icons/md";
import { GiRemedy } from "react-icons/gi";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { FaQuestion } from "react-icons/fa";
import { GrResources } from "react-icons/gr";

const Card = () => {
  const cardData = [
    {
      title: "PHQ-9 Depression Test",
      description: 
        "A tool to assess the severity of depression based on 9 questions aligned with DSM guidelines.",
      icon: <LuNewspaper size={40} color="#4A90E2" />,
      bgColor: "bg-blue-50",
    },
    {
      title: "Mood Regulation",
      description: 
        "Supports emotional stability and healthy responses to stress and life events.",
      icon: <MdMood size={40} color="#7CB9E8" />,
      bgColor: "bg-teal-100",
    },
    {
      title: "Remedies",
      description: 
        "Suggestions to improve mental well-being and restore emotional balance.",
      icon: <GiRemedy size={40} color="#76C7C0" />,
      bgColor: "bg-emerald-50",
    },
    {
      title: "Virtual Counselling",
      description: 
        "Accessible therapy via online platforms like video calls and chats.",
      icon: <HiMiniComputerDesktop size={40} color="#6AAB9C" />,
      bgColor: "bg-yellow-50",
    },
    {
      title: "Anonymous Chat",
      description: 
        "Talk freely without fear of judgment, maintaining full anonymity.",
      icon: <FaQuestion size={40} color="#8FA1B3" />,
      bgColor: "bg-indigo-50",
    },
    {
      title: "Resource Directory",
      description: 
        "A collection of helpful mental health resources and support systems.",
      icon: <GrResources size={40} color="#A3B9CC" />,
      bgColor: "bg-slate-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-8 py-12 max-w-6xl mx-auto">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`rounded-2xl p-8 ${card.bgColor} shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105`}
        >
          <div className="flex justify-center items-center mb-4">
            <div className="p-4 rounded-full bg-white shadow-md">
              {card.icon}
            </div>
          </div>
          <h3 className="text-lg font-medium text-center text-gray-700 mb-2">
            {card.title}
          </h3>
          <p className="text-center text-gray-600 leading-relaxed">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
};
export default Card