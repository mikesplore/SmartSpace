import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to SmartSpace</h1>
        <p className="text-xl text-gray-600 mb-6">Manage and book event spaces with ease</p>
        <div className="space-y-4">
          <p className="text-gray-700">🏢 Browse available spaces</p>
          <p className="text-gray-700">📅 Book your perfect venue</p>
          <p className="text-gray-700">⚡ Instant confirmation</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Quick Booking</h3>
          <p className="text-gray-600">Find and book spaces instantly</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Space Management</h3>
          <p className="text-gray-600">Manage your venues efficiently</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Analytics</h3>
          <p className="text-gray-600">Track usage and revenue</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
