import { useState, useEffect } from 'react';
import * as bookingsService from '../services/bookings';

export const useBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all bookings with optional filters
    const fetchBookings = async (filters = {}) => {
        setLoading(true);
        setError(null);
        try {
            const data = await bookingsService.getBookings(filters);
            setBookings(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch bookings');
            console.error('Error fetching bookings:', err);
        } finally {
            setLoading(false);
        }
    };

    // Get booking by ID
    const getBookingById = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const booking = await bookingsService.getBookingById(id);
            return booking;
        } catch (err) {
            setError(err.message || 'Failed to fetch booking');
            console.error('Error fetching booking:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Create booking
    const createBooking = async (bookingData) => {
        setLoading(true);
        setError(null);
        try {
            const newBooking = await bookingsService.createBooking(bookingData);
            setBookings(prev => [...prev, newBooking]);
            return newBooking;
        } catch (err) {
            setError(err.message || 'Failed to create booking');
            console.error('Error creating booking:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Update booking
    const updateBooking = async (id, bookingData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedBooking = await bookingsService.updateBooking(id, bookingData);
            setBookings(prev => prev.map(booking => 
                booking.id === id ? updatedBooking : booking
            ));
            return updatedBooking;
        } catch (err) {
            setError(err.message || 'Failed to update booking');
            console.error('Error updating booking:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Cancel booking
    const cancelBooking = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await bookingsService.cancelBooking(id);
            setBookings(prev => prev.map(booking => 
                booking.id === id ? { ...booking, status: 'cancelled' } : booking
            ));
        } catch (err) {
            setError(err.message || 'Failed to cancel booking');
            console.error('Error cancelling booking:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Approve booking (admin only)
    const approveBooking = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const approvedBooking = await bookingsService.approveBooking(id);
            setBookings(prev => prev.map(booking => 
                booking.id === id ? approvedBooking : booking
            ));
            return approvedBooking;
        } catch (err) {
            setError(err.message || 'Failed to approve booking');
            console.error('Error approving booking:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Reject booking (admin only)
    const rejectBooking = async (id, reason) => {
        setLoading(true);
        setError(null);
        try {
            const rejectedBooking = await bookingsService.rejectBooking(id, reason);
            setBookings(prev => prev.map(booking => 
                booking.id === id ? rejectedBooking : booking
            ));
            return rejectedBooking;
        } catch (err) {
            setError(err.message || 'Failed to reject booking');
            console.error('Error rejecting booking:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Get user bookings
    const getUserBookings = async (userId) => {
        setLoading(true);
        setError(null);
        try {
            const userBookings = await bookingsService.getUserBookings(userId);
            setBookings(userBookings);
            return userBookings;
        } catch (err) {
            setError(err.message || 'Failed to fetch user bookings');
            console.error('Error fetching user bookings:', err);
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
        cancelBooking,
        approveBooking,
        rejectBooking,
        getUserBookings,
        refreshBookings: fetchBookings
    };
};

export default useBookings;
