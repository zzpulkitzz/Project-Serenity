import React, { useState } from 'react';
import axios from 'axios';


const Chatbot = () => {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const prompt = userInput || "What is depression?";
            const res = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
                messages: [
                    { role: 'user', content: `${prompt} (Please provide a short and accurate answer)` },
                ],
                model: 'llama3-8b-8192',

            }, {
                headers: {
                    'Authorization': `Bearer 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`,
                    'Content-Type': 'application/json',
                },
            });

            console.log(res.data); // Log the entire response

            // Check the structure of the response
            if (res.data.choices && res.data.choices[0]) {
                setResponse(res.data.choices[0].message.content); // Ensure this is a string
            } else {
                setError("Unexpected response structure");
            }
            setError(''); // Clear any previous error
        } catch (err) {
            console.error("Error fetching response:", err);
            const errorMessage = err.response ? err.response.data : "Network error";
            setError(errorMessage); // Ensure this is a string
        }
    };

    return (
        <div className='flex flex-col gap-3'>
            <h1>Chatbot</h1>
            <form onSubmit={handleSubmit} className='flex gap-3 max-h-6'>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Ask something..."
                    required
                />
                <button type="submit" className='py-0 max-h-8 m-0'>Send</button>
            </form>
            {response && (
                <div>
                    <strong>Response:</strong> {String(response)} {/* Ensure this is a string */}
                </div>
            )}
            {error && <div className="error">{String(error)}</div>} {/* Ensure this is a string */}
        </div>
    );
};

export default Chatbot;