import React, { useState ,useEffect} from 'react';
import { useSearchParams } from 'react-router-dom'


const PHQ9TestComponent = () => {
  const [answers, setAnswers] = useState(Array(9).fill(0));
  const [score, setScore] = useState(null);
  const [searchParams]=useSearchParams()
  const uid=searchParams.get("uid")
  const questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself or that you're a failure",
    "Trouble concentrating on things",
    "Moving or speaking slowly or being restless",
    "Thoughts of being better off dead or hurting yourself"
  ];

  async function getScore(searchExp){
    try{
        console.log("getting")

      let response=await fetch(`https://project-serenity-8i86.onrender.com/users/score?uid=${uid}`,{headers:{"authorization":`Bearer }`}})
      let list_temp =await response.json()
      console.log(typeof list_temp)
      setScore(list_temp)
      
      if (!response.ok) {
          // Throw an error if the response status is not OK
          throw new Error(`HTTP error! Status: ${response.status}`);
        }else{
            return null
        }
  }catch(error){
      console.log(error.message)
  }
  }

  
  async function sendScore(score){
    console.log(score)
    try{
        let response=await fetch(`https://project-serenity-8i86.onrender.com/users/score?uid=${uid}`,{
        method:"POST",
        headers:{"Content-type":"application/json","authorization":`Bearer ` },
        body: JSON.stringify({score:score}
          )})

        let res=await response.json()

        console.log(res)
        
    
        
    }catch(error){
        console.log(error)
    }}

  
  

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = parseInt(value);
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    const totalScore = answers.reduce((sum, current) => sum + current, 0);
    setScore(totalScore);
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional for smooth scrolling
    });

  };

  useEffect(()=>{
    setTimeout(()=>{
      getScore()
    },[500])
  },[0])

  useEffect(()=>{
    console.log(score)
    if(score!==null){
      sendScore(score)}
  },[score])


  const getRecommendation = () => {
    if (score === null) return '';
    if (score <= 4) return "Minimal depression. Monitor your mental health.";
    if (score <= 9) return "Mild depression. Consider self-help or a counselor.";
    if (score <= 14) return "Moderate depression. Speak with a mental health professional.";
    if (score <= 19) return "Moderately severe depression. Professional help recommended.";
    return "Severe depression. Seek immediate help.";
  };



  const progressPercentage = (score / 27) * 100;

  return (
    <div>
      <div className='widget'>
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-8 mt-[20px]">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <svg 
            viewBox="0 0 24 24" 
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <path d="M9 9h.01M15 9h.01"/>
          </svg>
          <h1 className="text-2xl font-bold">Mental Health Score</h1>
        </div>

        {/* Score Display */}
        <div className="flex items-baseline gap-2 text-[rgb(251,190,36)]">
          <span className="text-6xl font-bold ">
            {score}
          </span>
          <span className="text-4xl text-gray-400">
            /27
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-black rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Description */}
        <p>{getRecommendation()}</p>

        {/* Quote */}
        <div className="bg-[rgb(251,190,36)] rounded-xl p-4">
          <blockquote className="text-lg italic">
            "Small steps lead to big changes."
          </blockquote>
        </div>
      </div>
    </div>
      </div>
      <h2 className='font-bold text-2xl mt-5 mb-5'>PHQ-9 Depression Test</h2>
      {questions.map((question, index) => (
        <div key={index} className='border rounded-xl max-w-[45vw] flex flex-col justify-center items-center mx-auto gap-4 mt-5 mb-5 p-5 text-black font-semibold font bg-blue-200' >
          <p className='text-xl'>{question}</p>
          <select onChange={(e) => handleAnswerChange(index, e.target.value)} className='border border-black text-black rounded-md'>
            <option value="0">Not at all</option>
            <option value="1">Several days</option>
            <option value="2">More than half the days</option>
            <option value="3">Nearly every day</option>
          </select>
        </div>
      ))}
      <button onClick={calculateScore} className="bg-blue-500 hover:rounded-[0px] hover:bg-blue-400" >Submit</button>

     
    </div>
  );
};

export default PHQ9TestComponent;
