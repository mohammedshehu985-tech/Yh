import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Send, Loader2, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const AIAdvisor = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Hello! I'm your Vanguardia AI advisor. How can I help you with your investment strategy today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const model = "gemini-3-flash-preview";
      const response = await genAI.models.generateContent({
        model,
        contents: userMessage,
        config: {
          systemInstruction: "You are a professional investment advisor at Vanguardia. Provide concise, high-level investment insights. Avoid specific financial advice that could lead to legal issues, but explain concepts, market trends, and general strategies. Maintain a sophisticated, helpful tone.",
        }
      });

      const botResponse = response.text || "I'm sorry, I couldn't process that request right now.";
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having trouble connecting to my brain right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-black/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-6">
            <Sparkles size={18} />
            <span className="text-sm font-semibold tracking-wide uppercase">AI Insights</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Intelligent Advisory</h2>
          <p className="text-white/60">Get instant answers to your investment questions from our advanced AI model.</p>
        </div>

        <div className="glass-card flex flex-col h-[600px] overflow-hidden shadow-2xl">
          <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-white/10' : 'emerald-gradient'}`}>
                    {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                  </div>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-white/5 border border-white/10 rounded-tr-none' : 'bg-white/10 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full emerald-gradient flex items-center justify-center animate-pulse">
                  <Bot size={20} />
                </div>
                <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none">
                  <Loader2 className="animate-spin text-emerald-400" size={20} />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white/5 border-t border-white/10">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about market trends, diversification, or portfolio strategies..."
                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-6 pr-14 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 emerald-gradient rounded-lg flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-white/30 text-center mt-3 uppercase tracking-widest">
              Powered by Gemini AI • Vanguardia Intelligence
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
