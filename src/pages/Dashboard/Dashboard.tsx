import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useTransactions } from '../../hooks/useTransactions';
import { TransactionForm } from '../../components/dashboard/TransactionForm';
import { TransactionList } from '../../components/dashboard/TransactionList';
import { SummaryCards } from '../../components/dashboard/SummaryCards';
import { DashboardNavbar } from '../../components/dashboard/DashboardNavbar';
import { RecentTransactions } from '../../components/dashboard/RecentTransactions';
import { QuickStats } from '../../components/dashboard/QuickStats';

import { FloatingActionButton } from '../../components/dashboard/FloatingActionButton';
import { SummaryCardsSkeleton, TransactionListSkeleton } from '../../components/ui/LoadingSkeleton';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useUser();
  const userId = user?.id || '';
  
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  
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
      setShowTransactionForm(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteTransaction(id);
      toast.success('Transaction deleted successfully!');
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast.error('Failed to delete transaction. Please try again.');
    }
  };



  const handleQuickAddExpense = () => {
    setShowTransactionForm(true);
    // You could also pre-fill the form with expense type
  };

  const handleQuickAddIncome = () => {
    setShowTransactionForm(true);
    // You could also pre-fill the form with income type
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-[#E63946] mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-[#154D71] text-white rounded-lg hover:bg-[#1C6EA4] transition-colors duration-200"
          >
            Retry
          </button>
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
            {loading ? <SummaryCardsSkeleton /> : <SummaryCards stats={getStats()} />}

            {/* Quick Stats */}
            <QuickStats transactions={transactions} loading={loading} />

            

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Transaction Form */}
              {showTransactionForm && (
                <div className="lg:col-span-1">
                  <TransactionForm onSubmit={handleAddTransaction} loading={loading} />
                </div>
              )}

              {/* Recent Transactions & Transaction List */}
              <div className={`${showTransactionForm ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* Recent Transactions */}
                  <div className="xl:col-span-1">
                    <RecentTransactions transactions={transactions} loading={loading} />
                  </div>

                  {/* Transaction List */}
                  <div className="xl:col-span-1">
                    {loading ? (
                      <TransactionListSkeleton />
                    ) : (
                                             <TransactionList 
                         transactions={transactions}
                         onDelete={handleDeleteTransaction}
                         loading={loading}
                       />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Action Button */}
            <FloatingActionButton 
              onAddExpense={handleQuickAddExpense}
              onAddIncome={handleQuickAddIncome}
            />
          </div>
        </div>
      );
};

export default Dashboard;
