import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage/LandingPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Reports from './pages/Reports/Reports';
import Savings from './pages/Savings/Savings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F5F5F5]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={
              <SignedIn>
                <Dashboard />
              </SignedIn>
            }
          />
          <Route
            path="/reports"
            element={
              <SignedIn>
                <Reports />
              </SignedIn>
            }
          />
                         <Route
                 path="/savings"
                 element={
                   <SignedIn>
                     <Savings />
                   </SignedIn>
                 }
               />
          <Route path="/login" element={<div className="p-8">Login Page (Coming Soon)</div>} />
          <Route path="/register" element={<div className="p-8">Register Page (Coming Soon)</div>} />
        </Routes>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#154D71',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App
