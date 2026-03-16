import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calculator, Info } from 'lucide-react';

export const InvestmentCalculator = () => {
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(8);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const newData = [];
    let balance = initial;
    const monthlyRate = rate / 100 / 12;

    for (let i = 0; i <= years; i++) {
      newData.push({
        year: i,
        balance: Math.round(balance),
      });
      
      for (let m = 0; m < 12; m++) {
        balance = (balance + monthly) * (1 + monthlyRate);
      }
    }
    setData(newData);
  }, [initial, monthly, years, rate]);

  const finalBalance = data[data.length - 1]?.balance || 0;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Project your wealth.</h2>
          <p className="text-white/60">See how your investments could grow over time with compound interest.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="glass-card p-8 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-white/70">Initial Investment</label>
                <span className="text-emerald-400 font-bold">${initial.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="0" max="100000" step="1000" 
                value={initial} onChange={(e) => setInitial(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-white/70">Monthly Contribution</label>
                <span className="text-emerald-400 font-bold">${monthly.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="0" max="5000" step="100" 
                value={monthly} onChange={(e) => setMonthly(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-medium text-white/70">Time Period (Years)</label>
                <input 
                  type="number" value={years} onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-white/70">Expected Return (%)</label>
                <input 
                  type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-sm text-white/40 mb-2">Estimated Future Balance</p>
              <p className="text-4xl font-bold text-gradient">${finalBalance.toLocaleString()}</p>
            </div>
          </div>

          <div className="glass-card p-8 h-full flex flex-col">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <Calculator className="text-emerald-400" /> Growth Projection
            </h3>
            <div className="flex-grow min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="year" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis 
                    stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} 
                    tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    formatter={(val: any) => [`$${val.toLocaleString()}`, 'Balance']}
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff20', borderRadius: '8px' }}
                  />
                  <Area type="monotone" dataKey="balance" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 flex items-start gap-3 p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
              <Info className="text-emerald-400 shrink-0 mt-1" size={18} />
              <p className="text-xs text-white/60 leading-relaxed">
                This projection assumes reinvestment of all dividends and capital gains. 
                Actual returns may vary based on market conditions and investment choices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
