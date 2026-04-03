import React from 'react';
import { 
  ShoppingBag, 
  Coffee, 
  Car, 
  Smartphone, 
  ArrowUpRight, 
  ArrowDownLeft, 
  MoreHorizontal, 
  Search, 
  Filter, 
  ArrowUpDown,
  Trash2,
  Edit2,
  Inbox
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { motion, AnimatePresence } from 'motion/react';

const categoryIcons = {
  'Electronics': Smartphone,
  'Food & Drink': Coffee,
  'Transport': Car,
  'Income': ArrowUpRight,
  'Shopping': ShoppingBag,
};

const categoryColors = {
  'Electronics': 'bg-slate-100 text-slate-600',
  'Food & Drink': 'bg-amber-100 text-amber-600',
  'Transport': 'bg-blue-100 text-blue-600',
  'Income': 'bg-emerald-100 text-emerald-600',
  'Shopping': 'bg-purple-100 text-purple-600',
};

export default function Transactions() {
  const { 
    transactions, 
    allTransactions,
    role, 
    deleteTransaction, 
    searchQuery, 
    setSearchQuery,
    filterType,
    setFilterType,
    sortBy,
    setSortBy,
    resetFilters
  } = useDashboard();

  const isFiltering = searchQuery !== '' || filterType !== 'all';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recent Transactions</h3>
            <p className="text-sm text-slate-500">Your latest financial activities</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all w-40 lg:w-48"
              />
            </div>

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 hover:bg-slate-100 transition-colors">
              <Filter className="w-4 h-4 text-slate-400" />
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-600 focus:outline-none cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 hover:bg-slate-100 transition-colors">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-600 focus:outline-none cursor-pointer"
              >
                <option value="date">Newest</option>
                <option value="amount">Amount</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Transaction</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <AnimatePresence mode="popLayout">
              {transactions.length > 0 ? (
                transactions.map((tx) => {
                  const Icon = categoryIcons[tx.category] || ArrowDownLeft;
                  const colorClass = categoryColors[tx.category] || 'bg-slate-100 text-slate-600';
                  
                  return (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      key={tx.id} 
                      className="hover:bg-indigo-50/30 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${colorClass} group-hover:scale-110 transition-transform`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="font-semibold text-slate-900">{tx.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">{tx.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-500">{tx.date}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-bold ${
                          tx.type === 'income' ? 'text-emerald-600' : 'text-slate-900'
                        }`}>
                          {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          tx.status === 'Completed' 
                            ? 'bg-emerald-50 text-emerald-700' 
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {role === 'Admin' ? (
                            <>
                              <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all active:scale-95">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => deleteTransaction(tx.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all active:scale-95"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors opacity-0 group-hover:opacity-100 active:scale-95">
                              <MoreHorizontal className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center text-slate-400"
                    >
                      <div className="p-4 bg-slate-50 rounded-full mb-4">
                        <Inbox className="w-12 h-12 opacity-20" />
                      </div>
                      <p className="text-lg font-bold text-slate-900">
                        {allTransactions.length === 0 ? 'No transactions available' : 'No results found'}
                      </p>
                      <p className="text-sm mt-1 max-w-xs mx-auto">
                        {allTransactions.length === 0 
                          ? 'Start by adding your first transaction as an Admin.' 
                          : 'Try adjusting your search or filters to find what you are looking for.'}
                      </p>
                      {isFiltering && (
                        <button 
                          onClick={resetFilters}
                          className="mt-6 px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 active:scale-95"
                        >
                          Clear all filters
                        </button>
                      )}
                    </motion.div>
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
