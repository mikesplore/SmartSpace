import React from 'react';
import BookingCard from '../components/bookings/BookingCard';

// Example mock bookings
const mockBookings = [
  {
    id: '1',
    eventName: 'Team Quarterly Planning',
    spaceName: 'Conference Room A',
    status: 'Confirmed',
    date: 'July 20, 2025',
    time: '09:00 - 12:00'
  },
  {
    id: '2',
    eventName: 'Client Presentation',
    spaceName: 'Meeting Room B',
    status: 'Pending',
    date: 'July 22, 2025',
    time: '14:00 - 15:30'
  },
  {
    id: '3',
    eventName: 'Product Launch',
    spaceName: 'Event Hall',
    status: 'Cancelled',
    date: 'July 25, 2025',
    time: '10:00 - 16:00'
  }
];

const BookingCardExample: React.FC = () => {
  // Example handlers
  const handleViewBooking = (id: string) => {
    console.log(`View booking with ID: ${id}`);
    // In a real app, this would navigate to booking details
  };

  const handleEditBooking = (id: string) => {
    console.log(`Edit booking with ID: ${id}`);
    // In a real app, this would open edit form or navigate to edit page
  };

  const handleCancelBooking = (id: string) => {
    console.log(`Cancel booking with ID: ${id}`);
    // In a real app, this would show confirmation modal and then cancel booking
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Bookings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onView={handleViewBooking}
            onEdit={handleEditBooking}
            onCancel={handleCancelBooking}
            showDateTime={true}
          />
        ))}
      </div>
    </div>
  );
};

export default BookingCardExample;
