import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  // Mock data for dashboard
  const recentBookings = [
    {
      id: 1,
      spaceName: 'Conference Room A',
      date: '2025-07-25',
      time: '10:00 AM - 12:00 PM',
      status: 'confirmed',
      attendees: 12
    },
    {
      id: 2,
      spaceName: 'Meeting Room B',
      date: '2025-07-28',
      time: '2:00 PM - 4:00 PM',
      status: 'pending',
      attendees: 6
    },
    {
      id: 3,
      spaceName: 'Training Lab',
      date: '2025-07-30',
      time: '9:00 AM - 5:00 PM',
      status: 'confirmed',
      attendees: 25
    }
  ];

  const upcomingBookings = recentBookings.filter(booking => 
    new Date(booking.date) >= new Date()
  );

  const stats = [
    {
      title: 'Total Bookings',
      value: '24',
      icon: '📅',
      trend: '+12% from last month'
    },
    {
      title: 'Upcoming Events',
      value: upcomingBookings.length.toString(),
      icon: '🕐',
      trend: 'Next booking tomorrow'
    },
    {
      title: 'Hours Booked',
      value: '156',
      icon: '⏰',
      trend: '+8% from last month'
    },
    {
      title: 'Favorite Spaces',
      value: '3',
      icon: '⭐',
      trend: 'Conference rooms'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName || 'User'}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's an overview of your booking activity and upcoming events.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-2xl mr-4">{stat.icon}</div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Recent Bookings</h2>
                <Link 
                  to="/bookings" 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
            </div>
            <div className="p-6">
              {recentBookings.length > 0 ? (
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{booking.spaceName}</h3>
                        <p className="text-sm text-gray-500">{booking.date} • {booking.time}</p>
                        <p className="text-sm text-gray-500">{booking.attendees} attendees</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No bookings yet</p>
                  <Link 
                    to="/spaces" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block"
                  >
                    Browse Spaces
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-4">
              <Link 
                to="/spaces" 
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Book a Space
              </Link>
              <Link 
                to="/bookings" 
                className="block w-full bg-gray-100 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Manage Bookings
              </Link>
            </div>

            {/* Upcoming Events */}
            <div className="px-6 py-4 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Events</h3>
              {upcomingBookings.length > 0 ? (
                <div className="space-y-3">
                  {upcomingBookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{booking.spaceName}</p>
                        <p className="text-xs text-gray-500">{booking.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No upcoming events</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Booking confirmed for Conference Room A</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">📅</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New booking request submitted</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-sm">⏰</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Booking reminder: Meeting Room B tomorrow</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
