import React, { useState } from 'react';
import BookingForm from '../components/bookings/BookingForm';

const BookingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past' | 'create'>('all');

  // Mock bookings data
  const mockBookings = [
    {
      id: 1,
      spaceName: 'Conference Room A',
      spaceImage: '/api/placeholder/300/200',
      date: '2025-07-25',
      time: '10:00 AM - 12:00 PM',
      status: 'confirmed',
      attendees: 12,
      purpose: 'Team Meeting',
      totalCost: 150,
      createdAt: '2025-07-20'
    },
    {
      id: 2,
      spaceName: 'Meeting Room B',
      spaceImage: '/api/placeholder/300/200',
      date: '2025-07-28',
      time: '2:00 PM - 4:00 PM',
      status: 'pending',
      attendees: 6,
      purpose: 'Client Presentation',
      totalCost: 80,
      createdAt: '2025-07-21'
    },
    {
      id: 3,
      spaceName: 'Training Lab',
      spaceImage: '/api/placeholder/300/200',
      date: '2025-07-30',
      time: '9:00 AM - 5:00 PM',
      status: 'confirmed',
      attendees: 25,
      purpose: 'Workshop',
      totalCost: 800,
      createdAt: '2025-07-19'
    },
    {
      id: 4,
      spaceName: 'Event Hall',
      spaceImage: '/api/placeholder/300/200',
      date: '2025-07-15',
      time: '6:00 PM - 11:00 PM',
      status: 'completed',
      attendees: 150,
      purpose: 'Company Party',
      totalCost: 1250,
      createdAt: '2025-07-10'
    },
    {
      id: 5,
      spaceName: 'Conference Room B',
      spaceImage: '/api/placeholder/300/200',
      date: '2025-07-18',
      time: '1:00 PM - 3:00 PM',
      status: 'cancelled',
      attendees: 8,
      purpose: 'Strategy Planning',
      totalCost: 100,
      createdAt: '2025-07-15'
    }
  ];

  const today = new Date();
  const upcomingBookings = mockBookings.filter(booking => 
    new Date(booking.date) >= today && booking.status !== 'cancelled'
  );
  const pastBookings = mockBookings.filter(booking => 
    new Date(booking.date) < today || booking.status === 'completed' || booking.status === 'cancelled'
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancelBooking = (bookingId: number) => {
    // In a real app, this would make an API call
    console.log('Cancelling booking:', bookingId);
  };

  const renderBookingCard = (booking: any) => (
    <div key={booking.id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{booking.spaceName}</h3>
            <p className="text-sm text-gray-500">{booking.purpose}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Date & Time</p>
            <p className="font-medium">{booking.date}</p>
            <p className="text-sm text-gray-500">{booking.time}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Attendees</p>
            <p className="font-medium">{booking.attendees} people</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Total Cost</p>
            <p className="font-semibold text-lg text-green-600">${booking.totalCost}</p>
          </div>
          <div className="flex space-x-2">
            {booking.status === 'pending' && (
              <button
                onClick={() => handleCancelBooking(booking.id)}
                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
              >
                Cancel
              </button>
            )}
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const getBookingsToShow = () => {
    switch (activeTab) {
      case 'upcoming':
        return upcomingBookings;
      case 'past':
        return pastBookings;
      case 'all':
      default:
        return mockBookings;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your space reservations and booking history</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('all')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'all'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All Bookings ({mockBookings.length})
              </button>
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'upcoming'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Upcoming ({upcomingBookings.length})
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'past'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Past ({pastBookings.length})
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'create'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                New Booking
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'create' ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Book a New Space</h2>
            <BookingForm />
          </div>
        ) : (
          <div>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">📅</div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{mockBookings.length}</p>
                    <p className="text-sm text-gray-600">Total Bookings</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">🕐</div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{upcomingBookings.length}</p>
                    <p className="text-sm text-gray-600">Upcoming Events</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">💰</div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      ${mockBookings.reduce((sum, booking) => sum + booking.totalCost, 0)}
                    </p>
                    <p className="text-sm text-gray-600">Total Spent</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bookings List */}
            <div className="space-y-6">
              {getBookingsToShow().length > 0 ? (
                getBookingsToShow().map(renderBookingCard)
              ) : (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
                  <p className="text-gray-600 mb-6">
                    {activeTab === 'upcoming' 
                      ? "You don't have any upcoming bookings."
                      : activeTab === 'past'
                      ? "You don't have any past bookings."
                      : "You haven't made any bookings yet."
                    }
                  </p>
                  <button 
                    onClick={() => setActiveTab('create')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Book Your First Space
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
