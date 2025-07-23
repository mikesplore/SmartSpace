import axios from 'axios';
import { API_BASE_URL } from './baseUrl';

// Space interface based on API documentation
export interface Space {
    id: number;
    name: string;
    location: string;
    capacity: number;
    image1?: string;
    image2?: string;
    image3?: string;
    image4?: string;
    image5?: string;
    status: 'booked' | 'free';
    description?: string;
    equipment?: string;
    features?: string;
    price_per_hour: string;
    created_at: string;
    updated_at: string;
}

export interface CreateSpaceData {
    name: string;
    location: string;
    capacity: number;
    description?: string;
    equipment?: string;
    features?: string;
    price_per_hour: string;
}

// Get all spaces
export const getSpaces = async (): Promise<Space[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/spaces/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching spaces:', error);
        throw error;
    }
};

// Get space by ID
export const getSpaceById = async (id: number): Promise<Space> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/spaces/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching space:', error);
        throw error;
    }
};

// Create space (admin only)
export const createSpace = async (data: CreateSpaceData): Promise<Space> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/spaces/create/`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating space:', error);
        throw error;
    }
};

// Update space (admin only) 
export const updateSpace = async (id: number, data: Partial<CreateSpaceData>): Promise<Space> => {
    try {
        const response = await axios.put(`${API_BASE_URL}/spaces/${id}/`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating space:', error);
        throw error;
    }
};

// Delete space (admin only)
export const deleteSpace = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/spaces/${id}/`);
    } catch (error) {
        console.error('Error deleting space:', error);
        throw error;
    }
};

// Search spaces with filters
export const searchSpaces = async (filters: {
    search?: string;
    capacity_min?: number;
    capacity_max?: number;
    status?: 'booked' | 'free';
    features?: string;
    equipment?: string;
}): Promise<Space[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/spaces/`, {
            params: filters
        });
        return response.data;
    } catch (error) {
        console.error('Error searching spaces:', error);
        throw error;
    }
};

export default {
    getSpaces,
    getSpaceById,
    createSpace,
    updateSpace,
    deleteSpace,
    searchSpaces
};
