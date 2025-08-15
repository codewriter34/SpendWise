import { useUser } from '@clerk/clerk-react';
import { useTransactions } from '../../hooks/useTransactions';
import { MonthlyReports } from '../../components/dashboard/MonthlyReports';
import { DashboardNavbar } from '../../components/dashboard/DashboardNavbar';

const Reports = () => {
  const { user } = useUser();
  const userId = user?.id || '';

  const {
    transactions,
    loading,
    error,
  } = useTransactions(userId);

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
          <h1 className="text-3xl font-bold text-[#154D71]">Financial Reports</h1>
          <p className="text-gray-600 mt-2">
            Analyze your spending patterns and track your financial progress
          </p>
        </div>

        {/* Monthly Reports */}
        <MonthlyReports transactions={transactions} loading={loading} />
      </div>
    </div>
  );
};

export default Reports;
