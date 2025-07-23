import React, { useEffect, useState } from 'react';
import { useBookings } from '../../hooks/useBookings';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { format } from 'date-fns';

const PendingBookings: React.FC = () => {
  const { bookings, loading, error, fetchBookings, updateBooking } = useBookings();
  const [updating, setUpdating] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchBookings();
  }, []);

  const pendingBookings = bookings.filter(booking => booking.status === 'pending');

  const handleStatusUpdate = async (bookingId: string, newStatus: 'approved' | 'rejected') => {
    setUpdating(prev => ({ ...prev, [bookingId]: true }));
    try {
      await updateBooking(bookingId, { status: newStatus });
      await fetchBookings(); // Refresh the list
    } catch (error) {
      console.error('Error updating booking:', error);
    } finally {
      setUpdating(prev => ({ ...prev, [bookingId]: false }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Pending Bookings</h2>
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
          {pendingBookings.length} pending
        </span>
      </div>

      {pendingBookings.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-lg">No pending bookings</div>
          <p className="text-sm">All bookings have been reviewed.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {pendingBookings.map(booking => (
            <div
              key={booking.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{booking.eventName}</h3>
                  <span className={`inline-block px-2 py-1 rounded text-sm font-medium mt-1 ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                
                <div className="flex space-x-3 mt-4 lg:mt-0">
                  <button
                    onClick={() => handleStatusUpdate(booking.id, 'approved')}
                    disabled={updating[booking.id]}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                  >
                    {updating[booking.id] ? 'Updating...' : 'Approve'}
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(booking.id, 'rejected')}
                    disabled={updating[booking.id]}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-gray-400 transition-colors"
                  >
                    {updating[booking.id] ? 'Updating...' : 'Reject'}
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="space-y-2">
                  <p><span className="font-medium">Space ID:</span> {booking.spaceId}</p>
                  <p><span className="font-medium">Date:</span> {format(new Date(booking.startDateTime), 'PPP')}</p>
                  <p><span className="font-medium">Time:</span> {format(new Date(booking.startDateTime), 'p')} - {format(new Date(booking.endDateTime), 'p')}</p>
                  <p><span className="font-medium">Type:</span> {booking.eventType}</p>
                </div>
                <div className="space-y-2">
                  <p><span className="font-medium">Organizer:</span> {booking.organizerName}</p>
                  <p><span className="font-medium">Email:</span> {booking.organizerEmail}</p>
                  <p><span className="font-medium">Attendees:</span> {booking.attendance}</p>
                </div>
              </div>
              
              {booking.resources && booking.resources.length > 0 && (
                <p className="mt-4 text-sm text-gray-600">
                  <span className="font-medium">Resources Requested:</span> {booking.resources.join(', ')}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingBookings;
