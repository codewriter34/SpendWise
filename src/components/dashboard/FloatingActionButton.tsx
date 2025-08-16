import { useState } from 'react';

interface FloatingActionButtonProps {
  onAddExpense: () => void;
  onAddIncome: () => void;
}

export const FloatingActionButton = ({ onAddExpense, onAddIncome }: FloatingActionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAddExpense = () => {
    setIsOpen(false);
    onAddExpense();
  };

  const handleAddIncome = () => {
    setIsOpen(false);
    onAddIncome();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Quick Action Buttons */}
      {isOpen && (
        <div className="mb-4 space-y-4">
                     {/* Add Income Button */}
           <div className="flex items-center space-x-3">
             <div className="bg-white rounded-lg shadow-lg px-3 py-2 text-sm text-[#154D71] font-medium whitespace-nowrap">
               Add Income
             </div>
                           <button
                onClick={handleAddIncome}
                className="flex items-center justify-center w-14 h-14 !bg-green-500 !text-white rounded-full shadow-lg hover:!bg-green-600 transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
                title="Add Income"
              >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
               </svg>
             </button>
           </div>

           {/* Add Expense Button */}
           <div className="flex items-center space-x-3">
             <div className="bg-white rounded-lg shadow-lg px-3 py-2 text-sm text-[#154D71] font-medium whitespace-nowrap">
               Add Expense
             </div>
                           <button
                onClick={handleAddExpense}
                className="flex items-center justify-center w-14 h-14 !bg-red-500 !text-white rounded-full shadow-lg hover:!bg-red-600 transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
                title="Add Expense"
              >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
               </svg>
             </button>
           </div>
        </div>
      )}

             {/* Main FAB Button */}
       <button
         onClick={toggleMenu}
         className="flex items-center justify-center w-16 h-16 !bg-[#154D71] !text-white rounded-full shadow-lg hover:!bg-[#1C6EA4] transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
         title={isOpen ? "Close Quick Actions" : "Quick Actions - Add Income or Expense"}
       >
        <svg
          className={`w-8 h-8 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>

      {/* Help Text when closed */}
      {!isOpen && (
        <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-lg px-3 py-2 text-sm text-[#154D71] font-medium whitespace-nowrap opacity-0 animate-pulse">
          Click to add transactions
        </div>
      )}
    </div>
  );
};
