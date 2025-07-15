import React from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '../../contexts/SidebarContext';

const Header: React.FC = () => {
  const { toggle } = useSidebar();

  return (
    <header className="bg-white shadow-md border-b sticky top-0 z-30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left section with menu button and logo */}
          <div className="flex items-center">
            <button
              onClick={toggle}
              className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link to="/" className="text-xl font-bold text-blue-600 ml-2 lg:ml-0">
              SmartSpace
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/spaces" className="text-gray-700 hover:text-blue-600 transition-colors">
              Spaces
            </Link>
            <Link to="/bookings" className="text-gray-700 hover:text-blue-600 transition-colors">
              Bookings
            </Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
          </nav>

          {/* Right section with action buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
