import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            SmartSpace
          </Link>
          <nav className="flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/spaces" className="text-gray-700 hover:text-blue-600 transition-colors">
              Spaces
            </Link>
            <Link to="/bookings" className="text-gray-700 hover:text-blue-600 transition-colors">
              Bookings
            </Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
