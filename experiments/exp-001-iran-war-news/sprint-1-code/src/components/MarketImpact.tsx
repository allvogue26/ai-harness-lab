import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { TrendingUp, TrendingDown, Droplet, Info } from 'lucide-react';

// Mock oil price data (Feb 27 - Mar 28)
const oilData = [
  { date: 'Feb 27', price: 80.50, event: 'War begins' },
  { date: 'Mar 1', price: 84.20, event: '' },
  { date: 'Mar 3', price: 87.80, event: '' },
  { date: 'Mar 5', price: 89.40, event: 'Philippines emergency' },
  { date: 'Mar 7', price: 88.90, event: '' },
  { date: 'Mar 9', price: 91.20, event: '' },
  { date: 'Mar 11', price: 93.50, event: 'Thai tanker attacked' },
  { date: 'Mar 13', price: 92.80, event: '' },
  { date: 'Mar 15', price: 90.40, event: 'Pakistan mediation' },
  { date: 'Mar 17', price: 91.60, event: '' },
  { date: 'Mar 19', price: 94.20, event: '' },
  { date: 'Mar 21', price: 95.80, event: 'Oil hits $95' },
  { date: 'Mar 23', price: 94.50, event: '' },
  { date: 'Mar 25', price: 93.20, event: '' },
  { date: 'Mar 27', price: 94.85, event: 'IRGC commander killed' },
  { date: 'Mar 28', price: 94.20, event: 'Current' },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
        <p className="text-slate-400 text-sm mb-1">{label}</p>
        <p className="text-white text-lg font-bold">${data.price.toFixed(2)}</p>
        {data.event && (
          <p className="text-yellow-400 text-xs mt-1">{data.event}</p>
        )}
      </div>
    );
  }
  return null;
};

export function MarketImpact() {
  const [timeRange, setTimeRange] = useState<'7d' | '14d' | '30d'>('30d');

  const currentPrice = oilData[oilData.length - 1].price;
  const startPrice = oilData[0].price;
  const change = currentPrice - startPrice;
  const changePercent = (change / startPrice) * 100;

  const filteredData = timeRange === '30d' ? oilData :
    timeRange === '14d' ? oilData.slice(-8) :
    oilData.slice(-4);

  return (
    <section className="mb-8">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2"
      >
        <span className="w-1 h-6 bg-green-500 rounded-full"></span>
        Market Impact
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-900 rounded-lg">
                <Droplet className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-slate-400 text-sm">Brent Crude Oil</h3>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-white">${currentPrice.toFixed(2)}</span>
                  <div className={`flex items-center gap-1 text-sm ${change >= 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span>+{changePercent.toFixed(1)}% (${change.toFixed(2)})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Range Buttons */}
            <div className="flex bg-slate-900 rounded-lg p-1">
              {(['7d', '14d', '30d'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    timeRange === range
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {range === '7d' ? '7 Days' : range === '14d' ? '14 Days' : '30 Days'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="p-6">
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#64748b" 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#64748b"
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  domain={['dataMin - 2', 'dataMax + 2']}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 divide-x divide-slate-700 border-t border-slate-700">
          <div className="p-4 text-center">
            <p className="text-slate-400 text-xs mb-1">30-Day High</p>
            <p className="text-white font-bold">$95.80</p>
            <p className="text-slate-500 text-xs">Mar 21</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-slate-400 text-xs mb-1">30-Day Low</p>
            <p className="text-white font-bold">$80.50</p>
            <p className="text-slate-500 text-xs">Feb 27</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-slate-400 text-xs mb-1">Volatility</p>
            <p className="text-red-400 font-bold">High</p>
            <p className="text-slate-500 text-xs">+18% swing</p>
          </div>
        </div>

        {/* Info */}
        <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-700 flex items-start gap-2">
          <Info className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
          <p className="text-slate-500 text-sm">
            Oil prices have surged since the war began, with Brent crude increasing by ${change.toFixed(2)} 
            ({changePercent.toFixed(1)}%) in 30 days. Hover over chart points to see key events.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
