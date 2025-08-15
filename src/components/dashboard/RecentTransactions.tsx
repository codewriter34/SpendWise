import type { Transaction } from '../../types/transaction';
import { formatCurrency } from '../../utils/currency';

interface RecentTransactionsProps {
  transactions: Transaction[];
  loading?: boolean;
}

export const RecentTransactions = ({ transactions, loading = false }: RecentTransactionsProps) => {
  const recentTransactions = transactions.slice(0, 5);

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Food': '🍽️',
      'Transport': '🚗',
      'Shopping': '🛍️',
      'Bills': '📄',
      'Entertainment': '🎬',
      'Healthcare': '🏥',
      'Salary': '💰',
      'Freelance': '💼',
      'Investment': '📈',
      'Gift': '🎁',
      'Other': '📝'
    };
    return icons[category] || '📝';
  };

  const getTypeColor = (type: 'income' | 'expense') => {
    return type === 'income' ? 'text-green-600' : 'text-red-600';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-[#154D71] mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="flex items-center justify-between py-2 animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (recentTransactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-[#154D71] mb-4">Recent Transactions</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📝</div>
          <p className="text-gray-500">No transactions yet</p>
          <p className="text-sm text-gray-400">Add your first transaction to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-[#154D71] mb-4">Recent Transactions</h3>
      <div className="space-y-3">
        {recentTransactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
                {getCategoryIcon(transaction.category)}
              </div>
              <div>
                <p className="font-medium text-[#154D71] text-sm">{transaction.description}</p>
                <p className="text-xs text-gray-500">{transaction.category} • {new Date(transaction.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className={`font-semibold text-sm ${getTypeColor(transaction.type)}`}>
              {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount, transaction.currency)}
            </div>
          </div>
        ))}
      </div>
      {transactions.length > 5 && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-500 text-center">
            Showing 5 of {transactions.length} transactions
          </p>
        </div>
      )}
    </div>
  );
};
