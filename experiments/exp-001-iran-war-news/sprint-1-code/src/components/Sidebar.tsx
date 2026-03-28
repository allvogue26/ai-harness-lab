import { TrendingUp, Users, AlertTriangle } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="hidden lg:block w-80 shrink-0">
      <div className="sticky top-20 space-y-6">
        {/* Key Metrics */}
        <div className="bg-slate-800 rounded-lg p-5 border border-slate-700">
          <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">
            Key Metrics
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-sm">Days in Conflict</span>
              </div>
              <span className="text-xl font-bold text-white">27</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm">Oil Price Change</span>
              </div>
              <span className="text-xl font-bold text-green-400">+18%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400">
                <Users className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Ships Stranded</span>
              </div>
              <span className="text-xl font-bold text-white">2,000</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-slate-800 rounded-lg p-5 border border-slate-700">
          <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">
            Strait Status
          </h3>
          
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center gap-2 text-red-400 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-xs font-medium uppercase">Effectively Closed</span>
            </div>
            <p className="text-xs text-slate-400">
              Only 9 ships passed through in the last 24h with Iranian coordination.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
