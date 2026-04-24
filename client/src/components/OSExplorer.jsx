import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fetchOSRepos } from '../api/index';
import ReactMarkdown from 'react-markdown';
import { Search, Rocket } from 'lucide-react';

const OSExplorer = () => {
    const [techStack, setTechStack] = useState("");
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!techStack) return alert("TechStack is required!");

        setLoading(true);
        setData("");

        try {
            const result = await fetchOSRepos(techStack);
            setData(result.data);
        } catch (error) {
            alert("Error fetching OS projects!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            {/* Input Section */}
            <motion.form 
                onSubmit={handleSearch}
                className="w-full max-w-lg flex gap-2 mb-10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3.5 text-gray-500 w-5 h-5" />
                    <input 
                        className="w-full p-3 pl-10 rounded-xl bg-gray-800 border border-gray-700 outline-none focus:border-emerald-500 text-white transition-all"
                        placeholder="e.g. MERN, AI/ML, Python..."
                        value={techStack}
                        onChange={(e) => setTechStack(e.target.value)}
                    />
                </div>
                <button 
                    disabled={loading}
                    className="bg-emerald-600 px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2"
                >
                    {loading ? "Finding..." : <><Rocket className="w-5 h-5" /> Find</>}
                </button>
            </motion.form>

            {/* AI Response Display */}
            {data && (
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full bg-gray-800/50 p-8 rounded-2xl border border-emerald-500/20 shadow-2xl prose prose-invert prose-emerald max-w-4xl"
                >
                    <ReactMarkdown>{data}</ReactMarkdown>
                </motion.div>
            )}
        </div>
    );
};

export default OSExplorer;