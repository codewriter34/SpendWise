import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import type { Transaction, MonthlyData, YearlyReport } from '../../types/transaction';
import { formatCurrency } from '../../utils/currency';

interface MonthlyReportsProps {
  transactions: Transaction[];
  loading?: boolean;
}

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export const MonthlyReports = ({ transactions, loading = false }: MonthlyReportsProps) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [yearlyReport, setYearlyReport] = useState<YearlyReport | null>(null);

  // Get available years from transactions
  const availableYears = Array.from(
    new Set(
      transactions.map(t => new Date(t.date).getFullYear())
    )
  ).sort((a, b) => b - a);

  // Generate monthly data for selected year
  useEffect(() => {
    if (!transactions.length) {
      setYearlyReport(null);
      return;
    }

    const yearTransactions = transactions.filter(t => 
      new Date(t.date).getFullYear() === selectedYear
    );

    const monthlyData: MonthlyData[] = MONTHS.map((month, index) => {
      const monthTransactions = yearTransactions.filter(t => 
        new Date(t.date).getMonth() === index
      );

      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        month,
        income,
        expenses,
        balance: income - expenses
      };
    });

    const totalIncome = monthlyData.reduce((sum, m) => sum + m.income, 0);
    const totalExpenses = monthlyData.reduce((sum, m) => sum + m.expenses, 0);

    setYearlyReport({
      year: selectedYear,
      monthlyData,
      totalIncome,
      totalExpenses,
      totalBalance: totalIncome - totalExpenses
    });
  }, [transactions, selectedYear]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-[#154D71]">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {formatCurrency(entry.value, 'XAF')}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-[#154D71] mb-4">Monthly Reports</h2>
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No transactions found</p>
          <p className="text-gray-400 text-sm mt-2">Add some transactions to see your monthly reports</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-[#154D71] mb-4 sm:mb-0">Monthly Reports</h2>
        
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-[#333]">Select Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33A1E0] focus:border-transparent cursor-pointer"
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {yearlyReport && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-r from-[#33A1E0] to-[#1E90FF] text-white p-4 rounded-lg">
              <p className="text-sm font-medium opacity-90">Total Income</p>
              <p className="text-xl font-bold">{formatCurrency(yearlyReport.totalIncome, 'XAF')}</p>
            </div>
            <div className="bg-gradient-to-r from-[#E63946] to-[#DC143C] text-white p-4 rounded-lg">
              <p className="text-sm font-medium opacity-90">Total Expenses</p>
              <p className="text-xl font-bold">{formatCurrency(yearlyReport.totalExpenses, 'XAF')}</p>
            </div>
            <div className={`p-4 rounded-lg ${
              yearlyReport.totalBalance >= 0 
                ? 'bg-gradient-to-r from-[#33A1E0] to-[#1E90FF] text-white'
                : 'bg-gradient-to-r from-[#E63946] to-[#DC143C] text-white'
            }`}>
              <p className="text-sm font-medium opacity-90">Net Balance</p>
              <p className="text-xl font-bold">{formatCurrency(yearlyReport.totalBalance, 'XAF')}</p>
            </div>
          </div>

          {/* Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyReport.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="income" 
                  fill="#33A1E0" 
                  name="Income"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="expenses" 
                  fill="#E63946" 
                  name="Expenses"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Breakdown */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-[#154D71] mb-4">Monthly Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {yearlyReport.monthlyData.map((monthData) => (
                <div 
                  key={monthData.month} 
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-[#154D71] mb-2">{monthData.month}</h4>
                  <div className="space-y-1 text-sm">
                    <p className="text-[#33A1E0]">
                      Income: {formatCurrency(monthData.income, 'XAF')}
                    </p>
                    <p className="text-[#E63946]">
                      Expenses: {formatCurrency(monthData.expenses, 'XAF')}
                    </p>
                    <p className={`font-medium ${
                      monthData.balance >= 0 ? 'text-[#33A1E0]' : 'text-[#E63946]'
                    }`}>
                      Balance: {formatCurrency(monthData.balance, 'XAF')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
