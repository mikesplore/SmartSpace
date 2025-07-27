import React from 'react';
import BookingForm from '../components/bookings/BookingForm';
import BookingList from '../components/bookings/BookingList';

const BookingsPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <BookingForm />
        </div>
        <div>
          <BookingList />
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
