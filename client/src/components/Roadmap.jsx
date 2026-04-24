import React, { useState } from 'react';
import ReactMarkdown from "react-markdown";
import { motion } from 'framer-motion';
import { getCareerRoadmap } from '../api/index'; 

const Roadmap = () => {
    const [formData, setFormData] = useState({
        grade: "",
        stream: "",
        subject: "",
        interests: ""
    });
    const [roadmap, setRoadmap] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Corrected typo
        
        // Proper validation check
        if (!formData.grade || !formData.stream || !formData.subject || !formData.interests) {
            return alert("❌ Bhai, saare fields bharo tabhi toh AI batayega!");
        }

        setLoading(true);
        setRoadmap(""); // Naya search karne par purana clean ho jaye

        try {
            const result = await getCareerRoadmap(formData);
            setRoadmap(result.data);
        } catch (error) {
            alert("Roadmap generation failed! Server check karo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            {/* Animated Form */}
            <motion.form 
                onSubmit={handleSubmit} 
                className='w-full max-w-xl space-y-4 bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-700'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h2 className="text-2xl font-bold mb-4 text-blue-400 text-center flex items-center justify-center gap-2">
                    AI Career Architect 🏗️
                </h2>

                <div className="space-y-3">
                    <input type="text" placeholder='Grade (e.g. 12th)' className='w-full p-3 bg-gray-900/50 rounded-xl outline-none border border-gray-700 focus:border-blue-500 transition-all'
                        onChange={(e) => setFormData({...formData, grade: e.target.value})}
                    />
                    <input type="text" placeholder='Stream (e.g. Science)' className='w-full p-3 bg-gray-900/50 rounded-xl outline-none border border-gray-700 focus:border-blue-500 transition-all'
                        onChange={(e) => setFormData({...formData, stream: e.target.value})}
                    />
                    <input type="text" placeholder='Subjects' className='w-full p-3 bg-gray-900/50 rounded-xl outline-none border border-gray-700 focus:border-blue-500 transition-all'
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    />
                    <textarea placeholder='Your Interests' rows="3" className='w-full p-3 bg-gray-900/50 rounded-xl outline-none border border-gray-700 focus:border-blue-500 transition-all'
                        onChange={(e) => setFormData({...formData, interests: e.target.value})}
                    />
                </div>

                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-blue-600 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20"
                >
                    {loading ? "AI is thinking... 🧠" : "Get Your Career Path"}
                </motion.button>
            </motion.form>

            {/* Animated AI Response */}
            {roadmap && (
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-10 w-full max-w-4xl bg-gray-800/80 p-8 rounded-2xl border border-blue-500/30 shadow-2xl backdrop-blur-sm"
                >
                    <div className="prose prose-invert prose-blue max-w-none">
                        <ReactMarkdown>{roadmap}</ReactMarkdown>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

export default Roadmap;