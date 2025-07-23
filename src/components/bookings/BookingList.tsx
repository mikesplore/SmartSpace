import React, { useEffect, useState } from 'react';
import { useBookings } from '../../hooks/useBookings';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { format } from 'date-fns';

type BookingStatus = 'all' | 'pending' | 'approved' | 'rejected';

const statuses: BookingStatus[] = ['all', 'pending', 'approved', 'rejected'];

const BookingList: React.FC = () => {
  const { bookings, loading, error, fetchBookings } = useBookings();
  const [statusFilter, setStatusFilter] = useState<BookingStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesSearch = booking.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.organizerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">All Bookings</h2>
      
      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Status
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as BookingStatus)}
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Bookings
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by event name or organizer"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Booking List */}
      <div className="grid gap-4">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No bookings found matching your criteria.
          </div>
        ) : (
          filteredBookings.map(booking => (
            <div
              key={booking.id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{booking.eventName}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0 ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p><span className="font-medium">Space ID:</span> {booking.spaceId}</p>
                  <p><span className="font-medium">Date:</span> {format(new Date(booking.startDateTime), 'PPP')}</p>
                  <p><span className="font-medium">Time:</span> {format(new Date(booking.startDateTime), 'p')} - {format(new Date(booking.endDateTime), 'p')}</p>
                </div>
                <div>
                  <p><span className="font-medium">Organizer:</span> {booking.organizerName}</p>
                  <p><span className="font-medium">Email:</span> {booking.organizerEmail}</p>
                  <p><span className="font-medium">Attendees:</span> {booking.attendance}</p>
                </div>
              </div>
              
              {booking.resources && booking.resources.length > 0 && (
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">Resources:</span> {booking.resources.join(', ')}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingList;

