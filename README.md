# Modern Finance Dashboard

A sleek, responsive financial dashboard built with React and Vite. This application allows users to track their income and expenses, visualize financial trends, and manage transactions with role-based access control.

## 🚀 Features

### 1. Dashboard Overview
- **Stat Cards**: Real-time summary of Total Balance, Monthly Income, Monthly Expenses, and Savings Rate.
- **Revenue Analytics**: Interactive area chart comparing revenue vs. expenses over time.
- **Quick Actions**: Fast access to common tasks like sending money, adding funds, and generating reports.

### 2. Transaction Management
- **Search & Filter**: Search transactions by name or category. Filter by transaction type (Income/Expense).
- **Sorting**: Sort transactions by date (newest first) or by amount.
- **Admin Controls**: Admins can add new transactions via a modal form and delete existing ones.
- **Empty States**: Graceful handling of empty transaction lists and "no results found" scenarios with clear calls to action.

### 3. Financial Insights
- **Top Spending**: Automatically identifies and displays the category with the highest expenditure.
- **Income vs. Expenses**: Visual comparison of total income and total expenses.
- **Smart Summaries**: Dynamic text insights based on your spending habits.

### 4. Role-Based Access Control (RBAC)
- **Admin Role**: Full access to view, add, and delete transactions.
- **Viewer Role**: Read-only access. Actions like "Add Funds" are disabled, and management tools are hidden.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.0
- **Animations**: Motion (formerly Framer Motion)
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React Context API + Hooks

## 📦 Installation & Running

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 🧩 Project Structure

- `src/context/DashboardContext.jsx`: Centralized state management for transactions, roles, and filters.
- `src/components/`: Reusable UI components (Sidebar, Header, StatCards, RevenueChart, QuickActions, Transactions, Insights).
- `src/lib/utils.js`: Utility functions for Tailwind class merging.
- `src/index.css`: Global styles and custom animations.

## 🛡️ Edge Case Handling

- **Invalid Inputs**: The "Add Transaction" form validates that the amount is a positive number.
- **Empty Data**: Specific UI states for when the dashboard has no data or when filters return no results.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens.
