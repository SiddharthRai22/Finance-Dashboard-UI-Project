/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCards from './components/StatCards';
import RevenueChart from './components/RevenueChart';
import QuickActions from './components/QuickActions';
import Transactions from './components/Transactions';
import Insights from './components/Insights';
import { DashboardProvider } from './context/DashboardContext';

export default function App() {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-slate-50">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-300 to-blue-300 rounded-full opacity-20 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-300 to-purple-300 rounded-full opacity-20 animate-float" style={{ animationDelay: '-3s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-10 animate-pulse-slow"></div>
        </div>

        <Sidebar />

        {/* Main Content */}
        <main className="md:ml-20 min-h-screen ml-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Header />
            <StatCards />
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
              <RevenueChart />
              <QuickActions />
            </div>

            <Insights />
            <Transactions />
          </div>
        </main>
      </div>
    </DashboardProvider>
  );
}
