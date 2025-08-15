import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/clerk-react';
import LandingPage from './pages/LandingPage/LandingPage';
import Dashboard from './pages/Dashboard/Dashboard';

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
          <Route path="/settings" element={<div className="p-8">Settings Page (Coming Soon)</div>} />
          <Route path="/login" element={<div className="p-8">Login Page (Coming Soon)</div>} />
          <Route path="/register" element={<div className="p-8">Register Page (Coming Soon)</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
