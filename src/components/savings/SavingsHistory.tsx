import { formatCurrency } from '../../utils/currency';

interface SavingsTransaction {
  id: string;
  amount: number;
  goalName: string;
  date: string;
  type: 'deposit' | 'withdrawal';
}

interface SavingsHistoryProps {
  transactions: SavingsTransaction[];
}

export const SavingsHistory = ({ transactions }: SavingsHistoryProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-[#154D71] mb-4">Recent Activity</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📊</div>
          <p className="text-gray-500">No recent activity</p>
          <p className="text-sm text-gray-400">Start saving to see your history here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#154D71]">Recent Activity</h3>
        <button className="text-sm text-[#154D71] hover:text-[#1C6EA4] transition-colors duration-200">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {transactions.slice(0, 5).map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <svg className={`w-5 h-5 ${
                  transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {transaction.type === 'deposit' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                  )}
                </svg>
              </div>
              <div>
                <p className="font-medium text-[#154D71] text-sm">
                  {transaction.type === 'deposit' ? 'Added to' : 'Withdrawn from'} {transaction.goalName}
                </p>
                <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold text-sm ${
                transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount, 'XAF')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {transactions.length > 5 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500 text-center">
            Showing 5 of {transactions.length} transactions
          </p>
        </div>
      )}
    </div>
  );
};
