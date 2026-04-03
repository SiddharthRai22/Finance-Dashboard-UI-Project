import React, { useState } from 'react';
import { Send, Plus, Download, PieChart, ArrowRight, X } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { motion, AnimatePresence } from 'motion/react';

const actions = [
  { label: 'Send Money', icon: Send, color: 'bg-indigo-50 text-indigo-600' },
  { label: 'Add Funds', icon: Plus, color: 'bg-emerald-50 text-emerald-600', type: 'add' },
  { label: 'Withdraw', icon: Download, color: 'bg-amber-50 text-amber-600' },
  { label: 'Reports', icon: PieChart, color: 'bg-purple-50 text-purple-600' },
];

export default function QuickActions() {
  const { role, addTransaction } = useDashboard();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTx, setNewTx] = useState({ name: '', category: 'Shopping', amount: '', type: 'expense' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(newTx.amount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid positive amount.');
      return;
    }

    addTransaction({
      ...newTx,
      amount: newTx.type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
      date: new Date().toISOString().split('T')[0],
      status: 'Completed'
    });
    setShowAddModal(false);
    setNewTx({ name: '', category: 'Shopping', amount: '', type: 'expense' });
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        {actions.map((action, index) => (
          <button
            key={index}
            disabled={role === 'Viewer' && action.type === 'add'}
            onClick={() => action.type === 'add' && setShowAddModal(true)}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-100 transition-all group active:scale-95 ${
              role === 'Viewer' && action.type === 'add' 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:border-indigo-100 hover:bg-indigo-50/30'
            }`}
          >
            <div className={`p-3 rounded-xl mb-3 transition-transform group-hover:scale-110 ${action.color}`}>
              <action.icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-slate-700">{action.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {showAddModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Add Transaction</h3>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Name</label>
                  <input 
                    required
                    value={newTx.name}
                    onChange={(e) => setNewTx({...newTx, name: e.target.value})}
                    type="text" 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20" 
                    placeholder="e.g. Netflix Subscription"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Amount</label>
                    <input 
                      required
                      value={newTx.amount}
                      onChange={(e) => setNewTx({...newTx, amount: e.target.value})}
                      type="number" 
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20" 
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Type</label>
                    <select 
                      value={newTx.type}
                      onChange={(e) => setNewTx({...newTx, type: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    >
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                  <select 
                    value={newTx.category}
                    onChange={(e) => setNewTx({...newTx, category: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="Shopping">Shopping</option>
                    <option value="Food & Drink">Food & Drink</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Transport">Transport</option>
                    <option value="Income">Income</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 mt-4">
                  Save Transaction
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-indigo-600 rounded-2xl p-5 text-white overflow-hidden relative group cursor-pointer">
        <div className="relative z-10">
          <p className="text-indigo-100 text-sm font-medium mb-1">Savings Goal</p>
          <h4 className="text-xl font-bold mb-4">$10,000.00</h4>
          <div className="w-full bg-indigo-500/50 rounded-full h-2 mb-2">
            <div className="bg-white h-full rounded-full w-[75%]"></div>
          </div>
          <div className="flex items-center justify-between text-xs font-medium">
            <span>75% Completed</span>
            <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              View Details <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
      </div>
    </div>
  );
}
