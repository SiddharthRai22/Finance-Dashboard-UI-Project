import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

const DashboardContext = createContext();

const initialTransactions = [
  {
    id: 1,
    name: 'Apple Store',
    category: 'Electronics',
    date: '2023-10-24',
    amount: -1299.00,
    status: 'Completed',
    type: 'expense'
  },
  {
    id: 2,
    name: 'Starbucks Coffee',
    category: 'Food & Drink',
    date: '2023-10-23',
    amount: -12.50,
    status: 'Completed',
    type: 'expense'
  },
  {
    id: 3,
    name: 'Uber Technologies',
    category: 'Transport',
    date: '2023-10-22',
    amount: -45.20,
    status: 'Pending',
    type: 'expense'
  },
  {
    id: 4,
    name: 'Freelance Payment',
    category: 'Income',
    date: '2023-10-21',
    amount: 4500.00,
    status: 'Completed',
    type: 'income'
  },
  {
    id: 5,
    name: 'Amazon.com',
    category: 'Shopping',
    date: '2023-10-20',
    amount: -89.99,
    status: 'Completed',
    type: 'expense'
  }
];

export function DashboardProvider({ children }) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [role, setRole] = useState('Admin'); // 'Admin' or 'Viewer'
  const [user, setUser] = useState({
    name: 'Admin User',
    role: 'Admin',
    avatar: null
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'income', 'expense'
  const [sortBy, setSortBy] = useState('date'); // 'date', 'amount'

  // Update user when role changes
  useEffect(() => {
    setUser({
      name: role === 'Admin' ? 'Admin User' : 'Viewer User',
      role: role,
      avatar: null
    });
  }, [role]);

  const addTransaction = (transaction) => {
    setTransactions(prev => [{ ...transaction, id: Date.now() }, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateTransaction = (id, updatedData) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updatedData } : t));
  };

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             t.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterType === 'all' || t.type === filterType;
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        if (sortBy === 'date') {
          return new Date(b.date) - new Date(a.date);
        }
        if (sortBy === 'amount') {
          return Math.abs(b.amount) - Math.abs(a.amount);
        }
        return 0;
      });
  }, [transactions, searchQuery, filterType, sortBy]);

  const insights = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const income = transactions.filter(t => t.type === 'income');
    
    const totalIncome = income.reduce((acc, t) => acc + t.amount, 0);
    const totalExpenses = Math.abs(expenses.reduce((acc, t) => acc + t.amount, 0));
    
    const categorySpending = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {});
    
    const highestCategory = Object.entries(categorySpending).sort((a, b) => b[1] - a[1])[0];
    
    return {
      totalIncome,
      totalExpenses,
      highestCategory: highestCategory ? { name: highestCategory[0], amount: highestCategory[1] } : null,
      savingsRate: totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : 0
    };
  }, [transactions]);

  const resetFilters = () => {
    setSearchQuery('');
    setFilterType('all');
    setSortBy('date');
  };

  return (
    <DashboardContext.Provider value={{
      transactions: filteredTransactions,
      allTransactions: transactions,
      role,
      setRole,
      user,
      searchQuery,
      setSearchQuery,
      filterType,
      setFilterType,
      sortBy,
      setSortBy,
      resetFilters,
      addTransaction,
      deleteTransaction,
      updateTransaction,
      insights
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboard must be used within a DashboardProvider');
  return context;
}
