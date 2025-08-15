import { useState } from 'react';
import type { Transaction } from '../../types/transaction';
import { formatCurrency } from '../../utils/currency';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => Promise<void>;
  loading?: boolean;
}

export const TransactionList = ({ transactions, onDelete, loading = false }: TransactionListProps) => {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = filter === 'all' || transaction.type === filter;
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatAmount = (amount: number, currency: string) => {
    return formatCurrency(amount, currency as any);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await onDelete(id);
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-[#154D71] mb-4 sm:mb-0">Transactions</h2>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          {/* Search */}
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33A1E0] focus:border-transparent"
          />
          
          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'income' | 'expense')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33A1E0] focus:border-transparent"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No transactions found</p>
          <p className="text-gray-400 text-sm mt-2">
            {searchTerm || filter !== 'all' 
              ? 'Try adjusting your search or filter'
              : 'Add your first transaction to get started'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    transaction.type === 'income' ? 'bg-[#33A1E0]' : 'bg-[#E63946]'
                  }`}></div>
                  <div>
                    <h3 className="font-medium text-[#333]">{transaction.description}</h3>
                    <p className="text-sm text-gray-500">
                      {transaction.category} • {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                                 <span className={`font-semibold ${
                   transaction.type === 'income' ? 'text-[#33A1E0]' : 'text-[#E63946]'
                 }`}>
                   {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount, transaction.currency)}
                 </span>
                
                <button
                  onClick={() => handleDelete(transaction.id!)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Delete transaction"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
