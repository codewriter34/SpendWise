import { useState } from 'react';
import type { Transaction, Currency } from '../../types/transaction';

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  loading?: boolean;
}

const defaultCategories = {
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
  expense: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Other']
};

export const TransactionForm = ({ onSubmit, loading = false }: TransactionFormProps) => {
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    currency: 'XAF' as Currency,
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.category || !formData.description) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const finalCategory = formData.category === 'Other' ? customCategory : formData.category;
      
      await onSubmit({
        userId: '', // Will be set by the parent component with Clerk user ID
        type: formData.type,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        category: finalCategory,
        description: formData.description,
        date: formData.date,
      });

      // Show success message
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);

                   // Reset form
             setFormData({
               type: 'expense',
               amount: '',
               currency: 'XAF',
               category: '',
               description: '',
               date: new Date().toISOString().split('T')[0]
             });
      setCustomCategory('');
      setShowCustomCategory(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleTypeChange = (type: 'income' | 'expense') => {
    setFormData(prev => ({ ...prev, type, category: '' }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-[#154D71] mb-6">Add Transaction</h2>
      
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          ✅ Transaction added successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Transaction Type */}
        <div>
          <label className="block text-sm font-medium text-[#333] mb-2">Type</label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => handleTypeChange('expense')}
              className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg transform hover:scale-105 ${
                formData.type === 'expense'
                  ? 'bg-gradient-to-r from-[#E63946] to-[#DC143C] text-white shadow-lg'
                  : 'bg-gray-100 text-[#333] hover:bg-gray-200 hover:text-[#E63946]'
              }`}
            >
              💸 Expense
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('income')}
              className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg transform hover:scale-105 ${
                formData.type === 'income'
                  ? 'bg-gradient-to-r from-[#33A1E0] to-[#1E90FF] text-white shadow-lg'
                  : 'bg-gray-100 text-[#333] hover:bg-gray-200 hover:text-[#33A1E0]'
              }`}
            >
              💰 Income
            </button>
          </div>
        </div>

                 {/* Amount */}
         <div>
           <label className="block text-sm font-medium text-[#333] mb-2">Amount (FCFA)</label>
           <input
             type="number"
             step="1"
             min="0"
             value={formData.amount}
             onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33A1E0] focus:border-transparent"
             placeholder="0"
             required
           />
         </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-[#333] mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, category: e.target.value }));
              setShowCustomCategory(e.target.value === 'Other');
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33A1E0] focus:border-transparent cursor-pointer"
            required
          >
            <option value="">Select a category</option>
            {defaultCategories[formData.type].map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          {/* Custom Category Input */}
          {showCustomCategory && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-[#333] mb-2">Custom Category</label>
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33A1E0] focus:border-transparent"
                placeholder="Enter custom category name"
                required
              />
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[#333] mb-2">Description</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33A1E0] focus:border-transparent"
            placeholder="Enter description"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-[#333] mb-2">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33A1E0] focus:border-transparent cursor-pointer"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#154D71] to-[#1C6EA4] text-white py-4 px-6 rounded-lg font-semibold hover:from-[#1C6EA4] hover:to-[#33A1E0] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
        >
          {loading ? '⏳ Adding...' : '💾 Add Transaction'}
        </button>
      </form>
    </div>
  );
};
