import axios from 'axios';
import { API_BASE_URL } from './baseUrl';

// Booking interface (based on the data model from README)
export interface Booking {
    id: string;
    eventName: string;
    startDateTime: string;
    endDateTime: string;
    organizerName: string;
    organizerEmail: string;
    eventType: 'internal' | 'external';
    attendance: number;
    resources: string[];
    status: 'pending' | 'approved' | 'rejected' | 'cancelled';
    userId: string;
    spaceId: string;
    approvedBy?: string;
    approvalDate?: string;
    rejectionReason?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateBookingData {
    eventName: string;
    startDateTime: string;
    endDateTime: string;
    organizerName: string;
    organizerEmail: string;
    eventType: 'internal' | 'external';
    attendance: number;
    resources: string[];
    spaceId: string;
}

// Get all bookings (with optional filters)
export const getBookings = async (filters?: {
    status?: string;
    user?: string;
    date?: string;
    space?: string;
}): Promise<Booking[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/bookings/`, {
            params: filters
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
    }
};

// Get booking by ID
export const getBookingById = async (id: string): Promise<Booking> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/bookings/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching booking:', error);
        throw error;
    }
};

// Create booking
export const createBooking = async (data: CreateBookingData): Promise<Booking> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/bookings/`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
};

// Update booking
export const updateBooking = async (id: string, data: Partial<CreateBookingData>): Promise<Booking> => {
    try {
        const response = await axios.put(`${API_BASE_URL}/bookings/${id}/`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating booking:', error);
        throw error;
    }
};

// Cancel booking
export const cancelBooking = async (id: string): Promise<void> => {
    try {
        await axios.patch(`${API_BASE_URL}/bookings/${id}/`, { status: 'cancelled' });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        throw error;
    }
};

// Approve booking (admin only)
export const approveBooking = async (id: string): Promise<Booking> => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/bookings/${id}/approve/`);
        return response.data;
    } catch (error) {
        console.error('Error approving booking:', error);
        throw error;
    }
};

// Reject booking (admin only)
export const rejectBooking = async (id: string, reason: string): Promise<Booking> => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/bookings/${id}/reject/`, {
            rejectionReason: reason
        });
        return response.data;
    } catch (error) {
        console.error('Error rejecting booking:', error);
        throw error;
    }
};

// Get user bookings
export const getUserBookings = async (userId: string): Promise<Booking[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/bookings/`, {
            params: { user: userId }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        throw error;
    }
};

export default {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    cancelBooking,
    approveBooking,
    rejectBooking,
    getUserBookings
};
