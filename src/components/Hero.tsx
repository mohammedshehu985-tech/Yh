import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-emerald-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            New: AI-Powered Wealth Management
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            Invest in your future <br />
            <span className="text-gradient">with absolute precision.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-white/60 mb-10 leading-relaxed">
            Experience the next generation of wealth management. Vanguardia combines 
            institutional-grade tools with AI insights to help you build lasting prosperity.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2">
              Start Investing <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 glass-card font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              View Markets <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 relative"
        >
          <div className="glass-card p-4 md:p-8 max-w-5xl mx-auto shadow-2xl shadow-emerald-500/5">
            <img 
              src="https://picsum.photos/seed/finance/1200/600" 
              alt="Dashboard Preview" 
              className="rounded-xl w-full object-cover h-[300px] md:h-[500px]"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
