import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const mockData = [
  { time: '09:00', value: 4200 },
  { time: '10:00', value: 4250 },
  { time: '11:00', value: 4230 },
  { time: '12:00', value: 4300 },
  { time: '13:00', value: 4280 },
  { time: '14:00', value: 4350 },
  { time: '15:00', value: 4400 },
];

const assets = [
  { name: 'S&P 500', price: '4,450.32', change: '+1.24%', trend: 'up' },
  { name: 'Bitcoin', price: '64,210.50', change: '+3.45%', trend: 'up' },
  { name: 'Gold', price: '2,150.20', change: '-0.12%', trend: 'down' },
  { name: 'Ethereum', price: '3,420.15', change: '+2.10%', trend: 'up' },
];

export const MarketStats = () => {
  return (
    <section className="py-20 bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 glass-card p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold">Market Performance</h3>
                <p className="text-sm text-white/50">Real-time index tracking</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-emerald-400">+2.4%</span>
                <p className="text-xs text-white/40">Past 24 hours</p>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="#ffffff40" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#ffffff40" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    domain={['dataMin - 100', 'dataMax + 100']}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff20', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6">Trending Assets</h3>
            {assets.map((asset, i) => (
              <div key={i} className="glass-card p-4 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${asset.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {asset.trend === 'up' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  </div>
                  <div>
                    <p className="font-semibold">{asset.name}</p>
                    <p className="text-xs text-white/40">Global Market</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">${asset.price}</p>
                  <p className={`text-xs font-medium ${asset.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {asset.change}
                  </p>
                </div>
              </div>
            ))}
            <button className="w-full py-4 text-sm font-semibold text-white/60 hover:text-white transition-colors">
              View All Assets
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
