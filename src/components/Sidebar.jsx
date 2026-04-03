import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  BarChart3, 
  Settings, 
  LogOut, 
  CreditCard,
  Users
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Wallet, label: 'Wallet' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Users, label: 'Team' },
  { icon: CreditCard, label: 'Cards' },
  { icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-16 md:w-20 bg-white border-r border-slate-200 flex flex-col items-center py-8 z-50">
      <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center mb-12 shadow-lg shadow-indigo-200">
        <Wallet className="text-white w-6 h-6" />
      </div>

      <nav className="flex-1 flex flex-col gap-6">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "p-3 rounded-xl transition-all duration-200 group relative",
              item.active 
                ? "bg-indigo-50 text-indigo-600" 
                : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
            )}
          >
            <item.icon className="w-6 h-6" />
            <span className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <button className="p-3 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 mt-auto">
        <LogOut className="w-6 h-6" />
      </button>
    </aside>
  );
}
