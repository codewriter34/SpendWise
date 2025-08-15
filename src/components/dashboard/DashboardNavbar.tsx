import { Link } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';

export const DashboardNavbar = () => {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-[#154D71] font-bold text-xl hover:text-[#1C6EA4] transition-colors duration-200"
            >
              SpendWise
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/dashboard"
                className="text-[#154D71] hover:text-[#1C6EA4] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link
                to="/settings"
                className="text-gray-500 hover:text-[#1C6EA4] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Settings
              </Link>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
};
