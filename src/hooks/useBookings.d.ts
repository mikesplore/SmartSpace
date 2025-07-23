export interface Booking {
  id: string;
  title: string;
  space: string;
  event_date: string;
  start_time: string;
  end_time: string;
  description?: string;
  attendees_count: number;
  event_type: 'internal' | 'external';
  organizer_name: string;
  organizer_email: string;
  resources?: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface UseBookingsReturn {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  fetchBookings: () => Promise<void>;
  createBooking: (bookingData: any) => Promise<void>;
  updateBooking: (id: string, bookingData: any) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
}

export declare function useBookings(): UseBookingsReturn;
