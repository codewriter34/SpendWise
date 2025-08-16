import type { Transaction } from '../../types/transaction';
import { formatCurrency } from '../../utils/currency';

interface QuickStatsProps {
  transactions: Transaction[];
  loading?: boolean;
}

export const QuickStats = ({ transactions, loading = false }: QuickStatsProps) => {
  const getTodayStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayTransactions = transactions.filter(t => t.date === today);
    
    const todayIncome = todayTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const todayExpenses = todayTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return { income: todayIncome, expenses: todayExpenses, balance: todayIncome - todayExpenses };
  };

  const getThisWeekStats = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const thisWeekTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= startOfWeek && transactionDate <= today;
    });
    
    const weekIncome = thisWeekTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const weekExpenses = thisWeekTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return { income: weekIncome, expenses: weekExpenses, balance: weekIncome - weekExpenses };
  };

  const todayStats = getTodayStats();
  const weekStats = getThisWeekStats();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[1, 2].map((index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 rounded w-32"></div>
              <div className="h-6 bg-gray-200 rounded w-28"></div>
              <div className="h-6 bg-gray-200 rounded w-36"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Today's Stats */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-[#154D71] mb-4">Today's Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Income:</span>
            <span className="font-semibold text-green-600">
              {formatCurrency(todayStats.income, 'XAF')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Expenses:</span>
            <span className="font-semibold text-red-600">
              {formatCurrency(todayStats.expenses, 'XAF')}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <span className="text-gray-800 font-medium">Balance:</span>
            <span className={`font-bold ${todayStats.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(todayStats.balance, 'XAF')}
            </span>
          </div>
        </div>
      </div>

      {/* This Week's Stats */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-[#154D71] mb-4">This Week's Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Income:</span>
            <span className="font-semibold text-green-600">
              {formatCurrency(weekStats.income, 'XAF')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Expenses:</span>
            <span className="font-semibold text-red-600">
              {formatCurrency(weekStats.expenses, 'XAF')}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <span className="text-gray-800 font-medium">Balance:</span>
            <span className={`font-bold ${weekStats.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(weekStats.balance, 'XAF')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
