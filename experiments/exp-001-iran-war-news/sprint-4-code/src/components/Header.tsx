import { Globe, Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-red-500" />
            <h1 className="text-xl font-bold text-slate-100">
              Iran War News Hub
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm text-slate-400 hover:text-slate-100 transition">
              Live Feed
            </a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-100 transition">
              Timeline
            </a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-100 transition">
              Markets
            </a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-100 transition">
              Map
            </a>
          </nav>
          
          <button className="md:hidden p-2 text-slate-400">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
