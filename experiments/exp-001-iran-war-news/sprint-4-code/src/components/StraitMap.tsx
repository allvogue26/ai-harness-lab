import { motion } from 'framer-motion';
import { Ship, AlertCircle, Navigation } from 'lucide-react';

export function StraitMap() {
  return (
    <section className="mb-8">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2"
      >
        <span className="w-1 h-6 bg-red-500 rounded-full"></span>
        Strait of Hormuz Status
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden"
      >
        {/* Status Header */}
        <div className="bg-gradient-to-r from-red-900/50 to-red-800/30 p-4 border-b border-red-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <motion.div
                  className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full"
                  animate={{ scale: [1, 2], opacity: [0.8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
              <div>
                <h3 className="text-red-400 font-bold text-lg">Effectively Closed</h3>
                <p className="text-red-300/70 text-sm">Limited traffic with Iranian coordination</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">9</div>
              <div className="text-xs text-slate-400">Ships passed (24h)</div>
            </div>
          </div>
        </div>

        {/* Map Visualization */}
        <div className="p-6">
          <div className="relative aspect-[16/9] max-w-3xl mx-auto">
            {/* Simplified Strait Map SVG */}
            <svg viewBox="0 0 800 450" className="w-full h-full">
              {/* Background - Water */}
              <rect width="800" height="450" fill="#1e293b" rx="8"/>
              
              {/* Iran (North) */}
              <path
                d="M0,0 L800,0 L800,120 Q600,140 400,130 Q200,120 0,140 Z"
                fill="#334155"
                stroke="#475569"
                strokeWidth="2"
              />
              <text x="400" y="50" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="600">IRAN</text>
              
              {/* UAE/Oman (South) */}
              <path
                d="M0,450 L800,450 L800,330 Q600,310 400,320 Q200,330 0,310 Z"
                fill="#334155"
                stroke="#475569"
                strokeWidth="2"
              />
              <text x="400" y="420" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="600">UAE / OMAN</text>
              
              {/* Strait Channel - Red for closed */}
              <rect
                x="350"
                y="140"
                width="100"
                height="170"
                fill="#7f1d1d"
                fillOpacity="0.4"
                stroke="#dc2626"
                strokeWidth="3"
                strokeDasharray="8,4"
                rx="4"
              />
              
              {/* Warning stripes */}
              <pattern id="warningStripes" patternUnits="userSpaceOnUse" width="20" height="20">
                <rect width="10" height="20" fill="#fbbf24" fillOpacity="0.3"/>
              </pattern>
              <rect
                x="350"
                y="140"
                width="100"
                height="170"
                fill="url(#warningStripes)"
                rx="4"
              />
              
              {/* Strait Label */}
              <text x="400" y="235" textAnchor="middle" fill="#dc2626" fontSize="14" fontWeight="700">STRAIT OF</text>
              <text x="400" y="255" textAnchor="middle" fill="#dc2626" fontSize="14" fontWeight="700">HORMUZ</text>
              
              {/* Ships waiting - North side */}
              {[...Array(8)].map((_, i) => (
                <motion.g key={`north-${i}`}>
                  <circle
                    cx={200 + (i % 4) * 40}
                    cy={80 + Math.floor(i / 4) * 30}
                    r="8"
                    fill="#f59e0b"
                    fillOpacity="0.6"
                  />
                  <motion.circle
                    cx={200 + (i % 4) * 40}
                    cy={80 + Math.floor(i / 4) * 30}
                    r="8"
                    fill="#f59e0b"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                  />
                </motion.g>
              ))}
              
              {/* Ships waiting - South side */}
              {[...Array(6)].map((_, i) => (
                <motion.g key={`south-${i}`}>
                  <circle
                    cx={220 + (i % 3) * 40}
                    cy={370 + Math.floor(i / 3) * 30}
                    r="8"
                    fill="#f59e0b"
                    fillOpacity="0.6"
                  />
                  <motion.circle
                    cx={220 + (i % 3) * 40}
                    cy={370 + Math.floor(i / 3) * 30}
                    r="8"
                    fill="#f59e0b"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
                  />
                </motion.g>
              ))}
              
              {/* Escorted ships in strait */}
              <motion.g
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <rect x="370" y="180" width="20" height="12" fill="#22c55e" rx="2"/>
                <rect x="410" y="220" width="20" height="12" fill="#22c55e" rx="2"/>
                <rect x="385" y="260" width="20" height="12" fill="#22c55e" rx="2"/>
              </motion.g>
              
              {/* Legend */}
              <g transform="translate(550, 380)">
                <rect width="220" height="60" fill="#0f172a" stroke="#334155" rx="4"/>
                <circle cx="20" cy="20" r="6" fill="#f59e0b"/>
                <text x="35" y="25" fill="#94a3b8" fontSize="12">Waiting ships</text>
                
                <rect x="12" y="40" width="16" height="8" fill="#22c55e" rx="2"/>
                <text x="35" y="48" fill="#94a3b8" fontSize="12">Escorted passage</text>
              </g>
              
              {/* Scale */}
              <g transform="translate(30, 400)">
                <line x1="0" y1="0" x2="100" y2="0" stroke="#475569" strokeWidth="2"/>
                <line x1="0" y1="-5" x2="0" y2="5" stroke="#475569" strokeWidth="2"/>
                <line x1="100" y1="-5" x2="100" y2="5" stroke="#475569" strokeWidth="2"/>
                <text x="50" y="20" textAnchor="middle" fill="#64748b" fontSize="11">~50 km</text>
              </g>
            </svg>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-slate-900/50 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-slate-400 mb-1">
                <Ship className="w-4 h-4" />
                <span className="text-sm">Normal Traffic</span>
              </div>
              <div className="text-2xl font-bold text-slate-300">~130/day</div>
            </div>
            
            <div className="text-center p-4 bg-slate-900/50 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-slate-400 mb-1">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Current Status</span>
              </div>
              <div className="text-2xl font-bold text-red-400">~5/day</div>
            </div>
            
            <div className="text-center p-4 bg-slate-900/50 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-slate-400 mb-1">
                <Navigation className="w-4 h-4" />
                <span className="text-sm">Alternative</span>
              </div>
              <div className="text-2xl font-bold text-yellow-400">+8 days</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
