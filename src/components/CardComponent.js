import React from 'react'
import { LuNewspaper } from "react-icons/lu";
import { MdMood } from "react-icons/md";
import { GiRemedy } from "react-icons/gi";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { FaQuestion } from "react-icons/fa";
import { GrResources } from "react-icons/gr";


const Card = () => {
  return (
            <div class="feature-grid" className='flex flex-wrap mx-auto gap-5 mb-5 w-full text-white max-w-[80vw] justify-center'>
                <div class="card" className='max-w-[30vw] border-2 border-black rounded-3xl p-8 flex flex-col justify-center bg-sky-400 max-h-[50vh] content-evenly'>
                    <div class="icon-container" className='mx-auto border-black border-2 rounded-full p-2 bg-white'>
                    <LuNewspaper color='blue'/>
                    </div>
                    <div class="card-info">
                        <div class="title" className='font-semibold text-xl mb-2'>
                        PHQ-9 Depression Test
                        </div>
                        <div class="info">
                        The PHQ-9 (Patient Health Questionnaire-9) is a widely used tool for assessing the severity of depression. It consists of nine questions, each corresponding to one of the symptoms of depression outlined in the DSM (Diagnostic and Statistical Manual of Mental Disorders).
                        </div>
                    </div> 
                </div>
                <div class="card" className='max-w-[30vw] border-2 border-black rounded-3xl p-8 flex flex-col justify-center bg-red-400 max-h-[50vh] content-evenly'>
                    <div class="icon-container" className='mx-auto border-black border-2 rounded-full p-2  bg-white'>
                    <MdMood color='blue'/>
                    </div>
                    <div class="card-info">
                        <div class="title" className='font-semibold text-xl mb-2'>
                            Mood Regulation
                        </div>
                        <div class="info">
                        Mood regulation plays a critical role in mental health, as it directly affects an individual's ability to manage emotions, respond to stress, and interact with others. Poor mood regulation can lead to emotional instability and is often associated with various mental health disorders such as depression, anxiety, and bipolar disorder.
                        </div>
                    </div> 
                </div>
                <div class="card" className='max-w-[30vw] border-2 border-black rounded-3xl p-8 flex flex-col bg-amber-300 max-h-[50vh] content-evenly'>
                    <div class="icon-container" className='mx-auto border-black border-2 rounded-full p-2  bg-white'>
                        <GiRemedy color='blue'/>
                    </div>
                    <div class="card-info">
                        <div class="title" className='font-semibold text-xl mb-2'>
                            Remedies
                        </div>
                        <div class="info">
                        Remedial measures are actions or interventions taken to address mental health issues, improve emotional well-being, and restore balance in an individual's mental state.
                        </div>
                    </div> 
                </div>
                <div class="card" className='max-w-[30vw] border-2 border-black rounded-3xl p-8 flex flex-col justify-center bg-green-400 max-h-[50vh] content-evenly'>
                    <div class="icon-container" className='mx-auto border-black border-2 rounded-full p-2  bg-white'>
                    <HiMiniComputerDesktop color='blue'/>
                    </div>
                    <div class="card-info">
                        <div class="title" className='font-semibold text-xl mb-2'>
                            Virtual Counselling
                        </div>
                        <div class="info">
                        Virtual counseling (also known as online or teletherapy) refers to mental health counseling conducted via digital platforms such as video calls, phone calls, chat, or messaging. It allows individuals to receive therapy or mental health support remotely, offering a flexible and accessible alternative to in-person counseling.
                        </div>
                    </div> 
                </div>
                <div class="card" className='max-w-[30vw] border-2 border-black rounded-3xl p-8 flex flex-col justify-center bg-emerald-500 max-h-[50vh] content-evenly'>
                    <div class="icon-container" className='mx-auto border-black border-2 rounded-full p-2  bg-white'>
                        <FaQuestion color='blue'/>
                    </div>
                    <div class="card-info">
                        <div class="title" className='font-semibold text-xl mb-2'>
                            Anonymous Chat
                        </div>
                        <div class="info">
                        Text-based or chat-based conversations with mental health professionals, volunteers, or peer supporters without revealing their identity. These platforms provide a sense of privacy and anonymity, allowing people to discuss sensitive issues without the fear of judgment or stigma.
                        </div>
                    </div> 
                </div>
                <div class="card" className='max-w-[30vw] border-2 border-black rounded-3xl p-8 flex flex-col justify-center bg-cyan-800 max-h-[50vh] content-evenly'>
                    <div class="icon-container" className='mx-auto border-black border-2 rounded-full p-2  bg-white'>
                    <GrResources color='blue'/>
                    </div>
                    <div class="card-info">
                        <div class="title" className='font-semibold text-xl mb-2'>
                            Resource Directory
                        </div>
                        <div class="info">
                        A comprehensive listing of various services, organizations, and support systems related to mental health care. This directory aims to help individuals, families, and professionals find appropriate mental health resources easily.
                        </div>
                    </div> 
                </div>
            </div>
  )
}

export default Card