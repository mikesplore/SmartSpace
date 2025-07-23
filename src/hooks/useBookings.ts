import { useState } from 'react';
import * as bookingsService from '../services/bookings';
import type { Booking } from '../services/bookings';

export const useBookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch all bookings
    const fetchBookings = async (filters: any = {}): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const data = await bookingsService.getBookings(filters);
            setBookings(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch bookings');
            console.error('Error fetching bookings:', err);
        } finally {
            setLoading(false);
        }
    };

    // Get booking by ID
    const getBookingById = async (id: string): Promise<Booking | undefined> => {
        try {
            const booking = await bookingsService.getBookingById(id);
            return booking;
        } catch (err: any) {
            setError(err.message || 'Failed to fetch booking');
            console.error('Error fetching booking:', err);
            throw err;
        }
    };

    // Create booking
    const createBooking = async (bookingData: any): Promise<Booking> => {
        setLoading(true);
        setError(null);
        try {
            const newBooking = await bookingsService.createBooking(bookingData);
            setBookings(prev => [...prev, newBooking]);
            return newBooking;
        } catch (err: any) {
            setError(err.message || 'Failed to create booking');
            console.error('Error creating booking:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Update booking
    const updateBooking = async (id: string, bookingData: any): Promise<Booking> => {
        setLoading(true);
        setError(null);
        try {
            const updatedBooking = await bookingsService.updateBooking(id, bookingData);
            setBookings(prev => prev.map(booking => 
                booking.id === id ? updatedBooking : booking
            ));
            return updatedBooking;
        } catch (err: any) {
            setError(err.message || 'Failed to update booking');
            console.error('Error updating booking:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Delete/cancel booking  
    const deleteBooking = async (id: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await bookingsService.cancelBooking(id);
            setBookings(prev => prev.filter(booking => booking.id !== id));
        } catch (err: any) {
            setError(err.message || 'Failed to delete booking');
            console.error('Error deleting booking:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        bookings,
        loading,
        error,
        fetchBookings,
        getBookingById,
        createBooking,
        updateBooking,
        deleteBooking
    };
};

export default useBookings;
