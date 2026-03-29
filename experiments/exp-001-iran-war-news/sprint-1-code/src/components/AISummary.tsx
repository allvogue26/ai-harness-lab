import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Loader2 } from 'lucide-react';
import { Article } from '../types';

interface AISummaryProps {
  article: Article;
}

// Mock AI summary generator
function generateSummary(article: Article): string[] {
  const summaries: Record<string, string[]> = {
    '1': [
      "Key Iranian military commander killed in targeted Israeli air strike",
      "Commander was central figure in Hormuz blockade strategy",
      "Death escalates tensions; Iran vows retaliation against US interests"
    ],
    '2': [
      "Trump administration extends pause on Iran energy strikes by 10 days",
      "Decision made as diplomatic talks continue through intermediaries",
      "Original deadline was March 26; new deadline April 5"
    ],
    '3': [
      "Oil prices surge 5% as Strait of Hormuz enters fourth week of closure",
      "Brent crude briefly touched $95/barrel, highest since 2022",
      "Global energy markets face continued supply uncertainty"
    ],
    '4': [
      "Philippines becomes first nation to declare national energy emergency",
      "Foreign secretary warns of only 40-45 days petroleum supply remaining",
      "Country heavily dependent on Middle East oil imports"
    ],
    '5': [
      "20,000 sailors remain stranded on ships in Persian Gulf",
      "Crews report sleeping on deck as rockets fly overhead",
      "Humanitarian crisis deepening as conflict extends into second month"
    ],
    '6': [
      "Iran officially rejects US 15-point peace proposal",
      "Response delivered through Pakistani mediators",
      "Tehran leaves door open for future negotiations"
    ],
    '7': [
      "Two South Asian workers killed by falling debris in UAE",
      "Casualties from intercepted ballistic missile fragments",
      "Total South Asian deaths reach at least six since war began"
    ],
    '8': [
      "11th Marine Expeditionary Unit deployed to Middle East",
      "Boxer Amphibious Ready Group accompanies deployment",
      "Move fuels speculation about potential ground operations"
    ],
    '9': [
      "Asian markets tumble amid deepening war uncertainty",
      "Investors concerned about prolonged conflict duration",
      "US markets experienced biggest drop since war began"
    ],
    '10': [
      "Iran threatens targeting of US troops in hotel accommodations",
      "Service members forced into civilian spaces after base evacuations",
      "Threat represents escalation in targeting of US personnel"
    ],
  };
  
  return summaries[article.id] || [
    `${article.title}`,
    "Key developments continue as conflict enters fourth week",
    "International community calls for de-escalation and diplomatic solution"
  ];
}

function extractEntities(text: string): { people: string[]; organizations: string[]; locations: string[] } {
  const people = ['Trump', 'Netanyahu', 'Khamenei'];
  const organizations = ['IRGC', 'IDF', 'US Navy', 'UN'];
  const locations = ['Tehran', 'Jerusalem', 'Hormuz', 'Persian Gulf', 'UAE'];
  
  return {
    people: people.filter(p => text.includes(p)),
    organizations: organizations.filter(o => text.includes(o)),
    locations: locations.filter(l => text.includes(l)),
  };
}

export function AISummary({ article }: AISummaryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string[] | null>(null);
  const [entities, setEntities] = useState<ReturnType<typeof extractEntities> | null>(null);

  const handleSummarize = async () => {
    if (summary) {
      setIsOpen(true);
      return;
    }
    
    setIsLoading(true);
    setIsOpen(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setSummary(generateSummary(article));
    setEntities(extractEntities(article.summary));
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={handleSummarize}
        className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition"
      >
        <Sparkles className="w-3.5 h-3.5" />
        {summary ? 'View Summary' : 'AI Summarize'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-slate-800 rounded-xl border border-slate-700 shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-gradient-to-r from-purple-900/30 to-transparent">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <h3 className="font-semibold text-white">AI Summary</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-slate-400 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-4">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 text-purple-400 animate-spin mb-3" />
                    <p className="text-slate-400 text-sm">Analyzing article...</p>
                  </div>
                ) : (
                  <>
                    {/* Summary Bullets */}
                    <div className="space-y-3 mb-4">
                      {summary?.map((point, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex gap-3"
                        >
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <p className="text-slate-300 text-sm leading-relaxed pt-0.5">{point}</p>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Entities */}
                    {entities && (
                      <div className="pt-4 border-t border-slate-700">
                        <p className="text-xs text-slate-500 mb-2">Key Entities Detected:</p>
                        <div className="flex flex-wrap gap-2">
                          {entities.people.map(p => (
                            <span key={p} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">👤 {p}</span>
                          ))}
                          {entities.organizations.map(o => (
                            <span key={o} className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">🏢 {o}</span>
                          ))}
                          {entities.locations.map(l => (
                            <span key={l} className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded">📍 {l}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
