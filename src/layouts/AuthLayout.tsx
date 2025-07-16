import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Left side - decorative or informational */}
      <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center justify-center items-center" 
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80)' }}>
        <div className="bg-black bg-opacity-50 p-12 rounded-lg max-w-md">
          <h1 className="text-4xl font-bold text-white mb-4">SmartSpace</h1>
          <p className="text-white text-lg">
            Discover and book the perfect space for your next event or meeting.
          </p>
        </div>
      </div>
      
      {/* Right side - authentication form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
