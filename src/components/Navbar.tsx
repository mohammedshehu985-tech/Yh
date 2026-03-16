import React from 'react';
import { TrendingUp, Shield, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 emerald-gradient rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">Vanguardia</span>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Markets</a>
              <a href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Portfolio</a>
              <a href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Insights</a>
              <button className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-all">
                Get Started
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-b border-white/10 px-4 pt-2 pb-6 space-y-4">
          <a href="#" className="block text-lg font-medium">Markets</a>
          <a href="#" className="block text-lg font-medium">Portfolio</a>
          <a href="#" className="block text-lg font-medium">Insights</a>
          <button className="w-full py-3 bg-white text-black font-semibold rounded-xl">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};
