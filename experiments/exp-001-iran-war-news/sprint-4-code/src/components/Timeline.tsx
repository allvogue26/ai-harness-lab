import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown, ChevronUp, Crosshair, Globe, TrendingUp, AlertCircle } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'military' | 'diplomatic' | 'economic' | 'humanitarian';
  impact: 'high' | 'medium' | 'low';
}

const events: TimelineEvent[] = [
  {
    id: '1',
    date: 'Feb 27, 2026',
    title: 'Israel Launches Air Strikes on Iran',
    description: 'Israeli forces conduct major air strikes on Iranian nuclear facilities and military bases. Iran retaliates with missile attacks on Israeli targets. War officially begins.',
    category: 'military',
    impact: 'high'
  },
  {
    id: '2',
    date: 'Feb 28, 2026',
    title: 'Iran Blocks Strait of Hormuz',
    description: 'Iran effectively closes the Strait of Hormuz to commercial shipping, trapping thousands of vessels in the Persian Gulf. Oil prices spike immediately.',
    category: 'economic',
    impact: 'high'
  },
  {
    id: '3',
    date: 'Mar 2, 2026',
    title: 'US Deploys Aircraft Carriers',
    description: 'United States deploys two aircraft carrier groups to the region. First attacks on Iranian naval vessels attempting to enforce the blockade.',
    category: 'military',
    impact: 'high'
  },
  {
    id: '4',
    date: 'Mar 5, 2026',
    title: 'Philippines Declares Energy Emergency',
    description: 'First country to declare national energy emergency due to dwindling petroleum reserves. Only 40-45 days of supply remaining.',
    category: 'economic',
    impact: 'medium'
  },
  {
    id: '5',
    date: 'Mar 11, 2026',
    title: 'Thai Tanker Attacked',
    description: 'Thai-flagged vessel Mayuree Naree hit by projectiles in Gulf. 20 crew rescued, 3 still missing. First major civilian vessel casualty.',
    category: 'humanitarian',
    impact: 'high'
  },
  {
    id: '6',
    date: 'Mar 15, 2026',
    title: 'Pakistan Offers Mediation',
    description: 'Pakistan offers to mediate between US and Iran. First signs of potential diplomatic channel opening.',
    category: 'diplomatic',
    impact: 'medium'
  },
  {
    id: '7',
    date: 'Mar 20, 2026',
    title: 'Oil Reaches $95/Barrel',
    description: 'Brent crude oil prices surge to $95 per barrel, highest since 2022. Global markets experience significant volatility.',
    category: 'economic',
    impact: 'high'
  },
  {
    id: '8',
    date: 'Mar 24, 2026',
    title: 'US Proposes 15-Point Peace Plan',
    description: 'Trump administration presents 15-point peace proposal via Pakistani mediators. Iran initially rejects but leaves door open for talks.',
    category: 'diplomatic',
    impact: 'high'
  },
  {
    id: '9',
    date: 'Mar 26, 2026',
    title: 'IRGC Navy Commander Killed',
    description: 'Key Iranian Revolutionary Guard Corps navy commander killed in Israeli strike. Iran threatens to escalate attacks on US interests.',
    category: 'military',
    impact: 'high'
  }
];

const categoryConfig = {
  military: { color: 'bg-red-500', icon: Crosshair, label: 'Military' },
  diplomatic: { color: 'bg-blue-500', icon: Globe, label: 'Diplomatic' },
  economic: { color: 'bg-green-500', icon: TrendingUp, label: 'Economic' },
  humanitarian: { color: 'bg-orange-500', icon: AlertCircle, label: 'Humanitarian' }
};

export function Timeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | TimelineEvent['category']>('all');

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(e => e.category === filter);

  return (
    <section className="mb-8">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2"
      >
        <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
        War Timeline
      </motion.h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
            filter === 'all' 
              ? 'bg-slate-700 text-white' 
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          All Events
        </button>
        {Object.entries(categoryConfig).map(([key, config]) => {
          const Icon = config.icon;
          return (
            <button
              key={key}
              onClick={() => setFilter(key as TimelineEvent['category'])}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition flex items-center gap-1.5 ${
                filter === key 
                  ? `${config.color} text-white` 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-slate-700"></div>

        <div className="space-y-4">
          {filteredEvents.map((event, index) => {
            const config = categoryConfig[event.category];
            const Icon = config.icon;
            const isExpanded = expandedId === event.id;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-12 md:pl-16"
              >
                {/* Dot */}
                <div className={`absolute left-2 md:left-4 w-4 h-4 rounded-full ${config.color} border-4 border-slate-900 z-10`}></div>

                {/* Card */}
                <div 
                  className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden cursor-pointer hover:border-slate-600 transition"
                  onClick={() => setExpandedId(isExpanded ? null : event.id)}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`${config.color} px-2 py-0.5 rounded text-xs font-medium text-white flex items-center gap-1`}>
                            <Icon className="w-3 h-3" />
                            {config.label}
                          </span>
                          {event.impact === 'high' && (
                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-500/20 text-red-400">
                              High Impact
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-lg font-semibold text-slate-100 mb-1">{event.title}</h3>
                        
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                      </div>

                      <button className="p-1 text-slate-500 hover:text-slate-300">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 mt-3 border-t border-slate-700">
                            <p className="text-slate-300 leading-relaxed">{event.description}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
