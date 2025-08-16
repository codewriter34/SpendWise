import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  onSnapshot, 
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useUser } from '@clerk/clerk-react';
import type { SavingsTransaction, SavingsGoal, SavingsStats, SavingsSummary } from '../types/savings';

export const useSavings = () => {
  const { user } = useUser();
  const [transactions, setTransactions] = useState<SavingsTransaction[]>([]);
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = user?.id;

  // Fetch savings transactions
  useEffect(() => {
    if (!userId) return;

    const transactionsQuery = query(
      collection(db, 'savings_transactions'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      transactionsQuery,
      (snapshot) => {
        const transactionsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        })) as SavingsTransaction[];
        
        setTransactions(transactionsData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching savings transactions:', err);
        setError('Failed to load savings transactions');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  // Fetch savings goals
  useEffect(() => {
    if (!userId) return;

    const goalsQuery = query(
      collection(db, 'savings_goals'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      goalsQuery,
      (snapshot) => {
        const goalsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          deadline: doc.data().deadline?.toDate() || new Date(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        })) as SavingsGoal[];
        
        setGoals(goalsData);
      },
      (err) => {
        console.error('Error fetching savings goals:', err);
        setError('Failed to load savings goals');
      }
    );

    return () => unsubscribe();
  }, [userId]);

  // Add a new savings transaction
  const addSavingsTransaction = async (transactionData: Omit<SavingsTransaction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!userId) throw new Error('User not authenticated');

    try {
      const newTransaction = {
        ...transactionData,
        userId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, 'savings_transactions'), newTransaction);
      return docRef.id;
    } catch (err) {
      console.error('Error adding savings transaction:', err);
      throw new Error('Failed to add savings transaction');
    }
  };

  // Add a new savings goal
  const addSavingsGoal = async (goalData: Omit<SavingsGoal, 'id' | 'userId' | 'currentAmount' | 'isActive' | 'createdAt' | 'updatedAt'>) => {
    if (!userId) throw new Error('User not authenticated');

    try {
      const newGoal = {
        ...goalData,
        userId,
        currentAmount: 0,
        isActive: true,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, 'savings_goals'), newGoal);
      return docRef.id;
    } catch (err) {
      console.error('Error adding savings goal:', err);
      throw new Error('Failed to add savings goal');
    }
  };

  // Update savings goal
  const updateSavingsGoal = async (goalId: string, updates: Partial<SavingsGoal>) => {
    try {
      const goalRef = doc(db, 'savings_goals', goalId);
      await updateDoc(goalRef, {
        ...updates,
        updatedAt: Timestamp.now(),
      });
    } catch (err) {
      console.error('Error updating savings goal:', err);
      throw new Error('Failed to update savings goal');
    }
  };

  // Delete savings goal
  const deleteSavingsGoal = async (goalId: string) => {
    try {
      await deleteDoc(doc(db, 'savings_goals', goalId));
    } catch (err) {
      console.error('Error deleting savings goal:', err);
      throw new Error('Failed to delete savings goal');
    }
  };

  // Calculate savings statistics
  const getSavingsStats = (): SavingsStats => {
    const successfulTransactions = transactions.filter(t => t.status === 'success');
    const deposits = successfulTransactions.filter(t => t.type === 'deposit');
    const withdrawals = successfulTransactions.filter(t => t.type === 'withdrawal');
    
    const totalDeposits = deposits.reduce((sum, t) => sum + t.amount, 0);
    const totalWithdrawals = withdrawals.reduce((sum, t) => sum + t.amount, 0);
    const totalSavings = totalDeposits - totalWithdrawals;

    // Calculate monthly savings (current month)
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyTransactions = successfulTransactions.filter(t => {
      const transactionDate = new Date(t.createdAt);
      return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
    });
    
    const monthlyDeposits = monthlyTransactions
      .filter(t => t.type === 'deposit')
      .reduce((sum, t) => sum + t.amount, 0);
    const monthlyWithdrawals = monthlyTransactions
      .filter(t => t.type === 'withdrawal')
      .reduce((sum, t) => sum + t.amount, 0);
    const monthlySavings = monthlyDeposits - monthlyWithdrawals;

    // Calculate savings rate (percentage of deposits vs withdrawals)
    const savingsRate = totalDeposits > 0 ? ((totalSavings / totalDeposits) * 100) : 0;

    const activeGoals = goals.filter(g => g.isActive).length;
    const completedGoals = goals.filter(g => !g.isActive).length;

    return {
      totalSavings,
      totalDeposits,
      totalWithdrawals,
      monthlySavings,
      savingsRate: Math.round(savingsRate * 100) / 100, // Round to 2 decimal places
      activeGoals,
      completedGoals,
    };
  };

  // Get savings summary
  const getSavingsSummary = (): SavingsSummary => {
    const stats = getSavingsStats();
    const recentTransactions = transactions.slice(0, 5); // Last 5 transactions
    const activeGoals = goals.filter(g => g.isActive);

    return {
      stats,
      recentTransactions,
      activeGoals,
    };
  };

  return {
    transactions,
    goals,
    loading,
    error,
    addSavingsTransaction,
    addSavingsGoal,
    updateSavingsGoal,
    deleteSavingsGoal,
    getSavingsStats,
    getSavingsSummary,
  };
};
