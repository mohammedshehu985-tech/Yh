import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarketStats } from './components/MarketStats';
import { InvestmentCalculator } from './components/InvestmentCalculator';
import { AIAdvisor } from './components/AIAdvisor';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <MarketStats />
        <InvestmentCalculator />
        <AIAdvisor />
      </main>
      <Footer />
    </div>
  );
}
