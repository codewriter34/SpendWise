export type Currency = 'XAF' | 'USD' | 'NGN' | 'EUR';

export interface Transaction {
  id?: string;
  userId: string;
  type: 'income' | 'expense';
  amount: number;
  currency: Currency;
  category: string;
  description: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon: string;
}

export interface DashboardStats {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  transactionCount: number;
}
