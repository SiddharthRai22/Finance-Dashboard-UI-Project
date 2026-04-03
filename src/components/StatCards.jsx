import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'motion/react';

const stats = [
  {
    label: 'Total Balance',
    value: '$48,290.00',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'bg-indigo-500',
  },
  {
    label: 'Monthly Income',
    value: '$12,450.00',
    change: '+8.2%',
    trend: 'up',
    icon: TrendingUp,
    color: 'bg-emerald-500',
  },
  {
    label: 'Monthly Expenses',
    value: '$4,820.00',
    change: '-2.4%',
    trend: 'down',
    icon: TrendingDown,
    color: 'bg-rose-500',
  },
  {
    label: 'Savings Rate',
    value: '62.4%',
    change: '+4.1%',
    trend: 'up',
    icon: CreditCard,
    color: 'bg-amber-500',
  },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`${stat.color} p-2.5 rounded-xl text-white`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {stat.change}
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
        </motion.div>
      ))}
    </div>
  );
}
