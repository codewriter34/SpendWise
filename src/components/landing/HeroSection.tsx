import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignUpButton } from '@clerk/clerk-react';
import heroImage from '../../assets/Spend-money-wisely.jpg';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-[#154D71] via-[#1C6EA4] to-[#33A1E0] text-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Take Control of Your
              <span className="text-[#FFF9AF] block">Financial Future</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-[#F5F5F5] max-w-2xl">
              Track your income and expenses, visualize spending patterns, and make informed financial decisions with our intuitive expense tracker.
            </p>
                         <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
               <SignedOut>
                 <SignUpButton mode="modal">
                   <button className="bg-[#FFF9AF] text-[#154D71] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-200 transition-colors duration-200 shadow-lg">
                     Get Started Free
                   </button>
                 </SignUpButton>
               </SignedOut>
               <SignedIn>
                 <Link
                   to="/dashboard"
                   className="bg-[#FFF9AF] text-[#154D71] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-200 transition-colors duration-200 shadow-lg"
                 >
                   Go to Dashboard
                 </Link>
               </SignedIn>
               <Link
                 to="/features"
                 className="border-2 border-[#FFF9AF] text-[#FFF9AF] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FFF9AF] hover:text-[#154D71] transition-colors duration-200"
               >
                 Learn More
               </Link>
             </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
                             {/* Main Image */}
               <div className="w-96 h-96 rounded-full overflow-hidden shadow-2xl border-4 border-[#FFF9AF] border-opacity-30">
                <img 
                  src={heroImage} 
                  alt="Smart Finance Tracking" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#E63946] rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#33A1E0] rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
