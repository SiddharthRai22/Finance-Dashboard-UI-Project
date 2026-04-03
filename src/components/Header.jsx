import React from 'react';
import { Bell, Search, ChevronDown, Shield, User } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function Header() {
  const { role, setRole, user } = useDashboard();

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Financial Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back, {user.name}! Here's what's happening today.</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Role Switcher */}
        <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
          <button 
            onClick={() => setRole('Admin')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              role === 'Admin' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Shield className="w-3 h-3" />
            Admin
          </button>
          <button 
            onClick={() => setRole('Viewer')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              role === 'Viewer' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <User className="w-3 h-3" />
            Viewer
          </button>
        </div>

        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-48 lg:w-64"
          />
        </div>

        <button className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors relative">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white overflow-hidden shadow-sm flex items-center justify-center">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt="Profile" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="text-sm font-bold text-indigo-600">
                {getInitials(user.name)}
              </span>
            )}
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-sm font-semibold text-slate-900">{user.name}</p>
            <p className="text-xs text-slate-500">{user.role} Account</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 hidden lg:block" />
        </div>
      </div>
    </header>
  );
}
