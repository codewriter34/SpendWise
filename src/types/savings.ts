export interface SavingsTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
  service: 'MTN' | 'ORANGE' | 'MOOV';
  phoneNumber: string;
  status: 'pending' | 'success' | 'failed';
  transactionId?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SavingsGoal {
  id: string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SavingsStats {
  totalSavings: number;
  totalDeposits: number;
  totalWithdrawals: number;
  monthlySavings: number;
  savingsRate: number;
  activeGoals: number;
  completedGoals: number;
}

export interface SavingsSummary {
  stats: SavingsStats;
  recentTransactions: SavingsTransaction[];
  activeGoals: SavingsGoal[];
}
