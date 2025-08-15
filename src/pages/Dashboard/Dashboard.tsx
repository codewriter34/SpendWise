import { SignedIn, useUser } from '@clerk/clerk-react';
import { useTransactions } from '../../hooks/useTransactions';
import { TransactionForm } from '../../components/dashboard/TransactionForm';
import { TransactionList } from '../../components/dashboard/TransactionList';
import { SummaryCards } from '../../components/dashboard/SummaryCards';
import { DashboardNavbar } from '../../components/dashboard/DashboardNavbar';

const Dashboard = () => {
  const { user } = useUser();
  const userId = user?.id || '';
  
  const {
    transactions,
    loading,
    error,
    addTransaction,
    deleteTransaction,
    getStats,
  } = useTransactions(userId);

  const handleAddTransaction = async (transactionData: any) => {
    if (!userId) return;
    
    try {
      await addTransaction({
        ...transactionData,
        userId,
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteTransaction(id);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-[#E63946] mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

           return (
           <div className="min-h-screen bg-[#F5F5F5]">
             <DashboardNavbar />
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
                 {/* Header */}
         <div className="mb-8">
           <h1 className="text-3xl font-bold text-[#154D71]">Dashboard</h1>
           <p className="text-gray-600 mt-2">
             Welcome to your dashboard, {user?.firstName || user?.username || 'User'}! Track your income and expenses
           </p>
         </div>

        {/* Summary Cards */}
        <SummaryCards stats={getStats()} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transaction Form */}
          <div className="lg:col-span-1">
            <TransactionForm onSubmit={handleAddTransaction} loading={loading} />
          </div>

          {/* Transaction List */}
          <div className="lg:col-span-2">
            <TransactionList 
              transactions={transactions}
              onDelete={handleDeleteTransaction}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
