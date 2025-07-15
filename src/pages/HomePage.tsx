import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 px-4 rounded-xl mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Find Your Perfect Space</h1>
          <p className="text-xl mb-8">Book professional spaces for meetings, events, and more in just a few clicks</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/spaces" className="bg-white text-blue-600 hover:bg-blue-50 transition-colors px-8 py-3 rounded-lg font-semibold shadow-lg">
              Browse Spaces
            </Link>
            <Link to="/register" className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 transition-colors px-8 py-3 rounded-lg font-semibold">
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="w-full max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How SmartSpace Works</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow border border-gray-100">
            <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto text-2xl font-bold">1</div>
            <h3 className="text-xl font-semibold text-center mb-4">Find Spaces</h3>
            <p className="text-gray-600 text-center">Browse our curated collection of professional spaces perfect for any need</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow border border-gray-100">
            <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto text-2xl font-bold">2</div>
            <h3 className="text-xl font-semibold text-center mb-4">Book Instantly</h3>
            <p className="text-gray-600 text-center">Reserve your space with real-time availability and instant confirmation</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow border border-gray-100">
            <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto text-2xl font-bold">3</div>
            <h3 className="text-xl font-semibold text-center mb-4">Enjoy Your Space</h3>
            <p className="text-gray-600 text-center">Show up and focus on what matters - we handle all the details</p>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="w-full bg-gray-50 py-16 px-4 rounded-xl mb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600 mb-4">"SmartSpace made finding and booking our company offsite incredibly easy. The whole process took minutes!"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full mr-4"></div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Marketing Director</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600 mb-4">"As a venue owner, SmartSpace has helped me maximize bookings and streamline management. Highly recommended!"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full mr-4"></div>
                <div>
                  <p className="font-semibold">Michael Chen</p>
                  <p className="text-sm text-gray-500">Event Space Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to find your space?</h2>
        <p className="text-xl text-gray-600 mb-8">Join thousands of satisfied users today</p>
        <Link to="/register" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors px-10 py-4 rounded-lg font-semibold shadow-lg inline-block">
          Get Started Now
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
