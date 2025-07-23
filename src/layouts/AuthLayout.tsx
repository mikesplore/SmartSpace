import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      {/* Header with logo */}
      <header className="w-full py-6 px-4 flex justify-center">
        <div className="flex items-center space-x-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-blue-600" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clipRule="evenodd" />
            <path d="M7 14h6v2H7v-2z" />
          </svg>
          <span className="text-2xl font-bold text-slate-800">SmartSpace</span>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 flex justify-center items-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
          <Outlet />
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-4 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} SmartSpace. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AuthLayout;
