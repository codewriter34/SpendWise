import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';

export const DashboardNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#154D71] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/App Name */}
                     <div className="flex-shrink-0">
             <Link 
               to="/" 
               className="!text-white font-bold text-xl hover:text-[#FFF9AF] transition-colors duration-200"
               onClick={closeMenu}
             >
               SpendWise
             </Link>
           </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/dashboard"
                className="!text-white hover:!text-[#FFF9AF] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Dashboard
              </Link>
                             <Link
                 to="/savings"
                 className="!text-white hover:!text-[#FFF9AF] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
               >
                 Savings
               </Link>
               <Link
                 to="/reports"
                 className="!text-white hover:!text-[#FFF9AF] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
               >
                 Reports
               </Link>
              <Link
                to="/"
                className="bg-[#33A1E0] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1C6EA4] transition-colors duration-200 shadow-md"
              >
                Back to Landing
              </Link>
              <UserButton />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#154D71] bg-[#FFF9AF] hover:text-[#1C6EA4] hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#154D71] transition-colors duration-200 shadow-md"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close Icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-[#154D71] shadow-lg border-t border-[#1C6EA4]`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#154D71]">
                               <Link
            to="/dashboard"
            className="block px-3 py-2 rounded-md text-base font-medium !text-white hover:bg-[#FFF9AF] hover:!text-[#154D71] transition-colors duration-200"
            onClick={closeMenu}
          >
            Dashboard
          </Link>
                     <Link
             to="/savings"
             className="block px-3 py-2 rounded-md text-base font-medium !text-white hover:bg-[#FFF9AF] hover:!text-[#154D71] transition-colors duration-200"
             onClick={closeMenu}
           >
             Savings
           </Link>
           <Link
             to="/reports"
             className="block px-3 py-2 rounded-md text-base font-medium !text-white hover:bg-[#FFF9AF] hover:!text-[#154D71] transition-colors duration-200"
             onClick={closeMenu}
           >
             Reports
           </Link>
           <Link
             to="/"
             className="block px-3 py-2 rounded-md text-base font-medium bg-[#33A1E0] text-white hover:bg-[#1C6EA4] transition-colors duration-200"
             onClick={closeMenu}
           >
             Back to Landing
           </Link>
          <div className="flex justify-center py-2">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
};
