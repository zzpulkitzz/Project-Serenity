

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FaSmile, FaFrown, FaMeh, FaSadTear, FaGrinStars } from 'react-icons/fa'; // Import icons for moods
import { FiSend } from 'react-icons/fi'; // Send icon for submission

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MoodTrackingComponent = () => {
  const [mood, setMood] = useState(5);
  const [note, setNote] = useState('');
  const [moodData, setMoodData] = useState([]);

  // Load existing mood data from localStorage when component mounts
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('moodData')) || [];
    setMoodData(storedData);
  }, []);

  // Submit mood entry
  const handleMoodSubmit = () => {
    const newMoodEntry = {
      date: new Date().toLocaleDateString(),
      mood: parseInt(mood),
      note,
    };
    const updatedMoodData = [...moodData, newMoodEntry];
    setMoodData(updatedMoodData);
    localStorage.setItem('moodData', JSON.stringify(updatedMoodData));
    setMood(5);
    setNote('');
  };
  console.log(moodData)
  // Prepare data for the chart
  const chartData = {
    labels: moodData.map((entry) => entry.date),
    datasets: [
      {
        label: 'Mood Score',
        data: moodData.map((entry) => entry.mood),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Function to display different mood icons based on mood score
  const getMoodIcon = (mood) => {
    if (mood <= 3) return <FaFrown className="text-red-500" size={30} />;
    if (mood <= 5) return <FaMeh className="text-yellow-500" size={30} />;
    if (mood <= 7) return <FaSmile className="text-green-500" size={30} />;
    return <FaGrinStars className="text-blue-500" size={30} />;
  };

  return (
    <div className="mood-tracker max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Track Your Mood</h2>
      
      <div className="mood-form mb-6">
        <h4 className="text-lg mb-2">How are you feeling today?</h4>

        <div className="flex items-center justify-between mb-4">
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={mood} 
            onChange={(e) => setMood(e.target.value)} 
            className="w-full"
          />
          <div className="ml-4">{getMoodIcon(mood)}</div> {/* Mood icon based on score */}
        </div>

        <span className="block mt-2 text-gray-600">{mood}/10</span>

        <textarea
          placeholder="Add a note about your day..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full mt-4 p-2 border border-gray-300 rounded-lg"
        />

        <button
          onClick={handleMoodSubmit}
          className="mt-4 flex items-center bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        >
          Submit Mood <FiSend className="ml-2" /> {/* Send icon next to button text */}
        </button>
      </div>

      <div className="mood-chart">
        <h4 className="text-lg font-semibold mb-4">Your Mood Trend</h4>
        {moodData.length > 0 ? (
          <Line data={chartData} />
        ) : (
          <p className="text-gray-600">No mood data available. Start logging your mood!</p>
        )}
      </div>
    </div>
  );
};

export default MoodTrackingComponent;
