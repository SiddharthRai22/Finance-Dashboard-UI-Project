import React from 'react';
import { TrendingUp, TrendingDown, PieChart, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { useDashboard } from '../context/DashboardContext';

export default function Insights() {
  const { insights, allTransactions } = useDashboard();

  if (allTransactions.length === 0) {
    return (
      <div className="mt-8 mb-12">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
            <PieChart className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Financial Insights</h2>
        </div>
        <div className="bg-white p-12 rounded-2xl border border-slate-200 border-dashed text-center">
          <Info className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">Add transactions to see your financial insights.</p>
        </div>
      </div>
    );
  }

  if (!insights.highestCategory) return null;

  return (
    <div className="mt-8 mb-12">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
          <PieChart className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Financial Insights</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500">Top Spending</span>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <h4 className="text-lg font-bold text-slate-900">{insights.highestCategory.name}</h4>
          <p className="text-2xl font-bold text-rose-600 mt-1">
            ${insights.highestCategory.amount.toLocaleString()}
          </p>
          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
            <Info className="w-3 h-3" />
            Most spent category this period
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500">Income vs Expenses</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500">Income</span>
                <span className="font-bold text-emerald-600">${insights.totalIncome.toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full" 
                  style={{ width: `${(insights.totalIncome / (insights.totalIncome + insights.totalExpenses)) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500">Expenses</span>
                <span className="font-bold text-rose-600">${insights.totalExpenses.toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-rose-500 h-full rounded-full" 
                  style={{ width: `${(insights.totalExpenses / (insights.totalIncome + insights.totalExpenses)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center"
        >
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
            <p className="text-sm text-indigo-900 font-medium leading-relaxed">
              "You've spent the most on <span className="font-bold text-indigo-600">{insights.highestCategory.name}</span> this month. 
              Your current savings rate is <span className="font-bold text-emerald-600">{insights.savingsRate}%</span>. 
              Keep it up!"
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
