import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Sidebar from '../components/common/Sidebar';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Sidebar />
    </div>
  );
};

export default MainLayout;
