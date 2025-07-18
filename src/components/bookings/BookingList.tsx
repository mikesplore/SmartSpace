import  { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

type Booking = {
  id: number;
  user: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
};

const statuses = ['all', 'pending', 'confirmed', 'cancelled'];

const BookingList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/bookings/', {
        params: {
          status: statusFilter !== 'all' ? statusFilter : undefined,
          user: userFilter || undefined,
          date: dateFilter || undefined,
          page,
        },
      });

      const fetched = response.data.results || response.data;

      setBookings(prev => (page === 1 ? fetched : [...prev, ...fetched]));
      setHasMore(response.data.next !== null);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter, userFilter, dateFilter, page]);

  const handleLoadMore = () => {
    if (!loading && hasMore) setPage(prev => prev + 1);
  };

  const handleFilterChange = () => {
    setPage(1); // Reset to first page on filter change
    fetchBookings();
  };

  return (
    <div className="p-4 space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <select title="Choose a status"
          className="p-2 border rounded"
          value={statusFilter}
          onChange={e => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          {statuses.map(status => (
            <option key={status} value={status}>
              {status.toUpperCase()}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Filter by user"
          value={userFilter}
          onChange={e => {
            setUserFilter(e.target.value);
            setPage(1);
          }}
        />

        <input
          type="date"
          title="Filter by date"
          placeholder="Filter by date"
          className="p-2 border rounded"
          value={dateFilter}
          onChange={e => {
            setDateFilter(e.target.value);
            setPage(1);
          }}
        />

        <button
          onClick={handleFilterChange}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>

      {/* Booking List */}
      <div className="grid gap-4">
        {bookings.map(booking => (
          <div
            key={booking.id}
            className="p-4 border rounded shadow-sm bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div>
              <p className="text-lg font-semibold">User: {booking.user}</p>
              <p className="text-sm text-gray-500">
                Date: {format(new Date(booking.date), 'PPP')}
              </p>
            </div>
            <span
              className={`px-2 py-1 rounded text-sm font-medium mt-2 sm:mt-0 ${
                booking.status === 'confirmed'
                  ? 'bg-green-100 text-green-700'
                  : booking.status === 'cancelled'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {booking.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {hasMore && (
        <div className="text-center mt-4">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingList;

