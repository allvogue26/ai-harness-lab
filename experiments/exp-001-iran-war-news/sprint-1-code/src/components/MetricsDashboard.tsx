import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, Users, Clock, Droplet } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

function AnimatedCounter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const spring = useSpring(0, { mass: 1, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => 
    `${prefix}${Math.round(current).toLocaleString()}${suffix}`
  );
  
  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span className="text-3xl font-bold text-white tabular-nums">
      {display}
    </motion.span>
  );
}

function MetricCard({ label, value, prefix, suffix, trend, trendValue, icon, color, delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-slate-600 transition group"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <span className={color}>{icon}</span>
            <span className="text-sm font-medium">{label}</span>
          </div>
          
          <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
          
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${
              trend === 'up' ? 'text-red-400' : trend === 'down' ? 'text-green-400' : 'text-slate-400'
            }`}>
              {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : 
               trend === 'down' ? <TrendingDown className="w-4 h-4" /> : null}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function MetricsDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const metrics = [
    {
      label: 'Days in Conflict',
      value: 27,
      suffix: '',
      trend: 'neutral' as const,
      trendValue: 'Since Feb 27',
      icon: <Clock className="w-5 h-5" />,
      color: 'text-orange-500',
      delay: 0
    },
    {
      label: 'Oil Price Change',
      value: 18,
      prefix: '+',
      suffix: '%',
      trend: 'up' as const,
      trendValue: 'Brent: $94.85',
      icon: <Droplet className="w-5 h-5" />,
      color: 'text-red-500',
      delay: 0.1
    },
    {
      label: 'Ships Stranded',
      value: 2000,
      suffix: '',
      trend: 'up' as const,
      trendValue: '+127 today',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'text-yellow-500',
      delay: 0.2
    },
    {
      label: 'Civilian Impact',
      value: 20000,
      suffix: '+',
      trend: 'up' as const,
      trendValue: 'Sailors affected',
      icon: <Users className="w-5 h-5" />,
      color: 'text-blue-500',
      delay: 0.3
    }
  ];

  return (
    <section className="mb-8">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2"
      >
        <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
        Live Metrics
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </section>
  );
}
