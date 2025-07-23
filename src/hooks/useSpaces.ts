import { useState, useEffect } from 'react';
import * as spacesService from '../services/spaces';
import type { Space } from '../services/spaces';

export const useSpaces = () => {
    const [spaces, setSpaces] = useState<Space[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch all spaces
    const fetchSpaces = async (): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const data = await spacesService.getSpaces();
            setSpaces(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch spaces');
            console.error('Error fetching spaces:', err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch space by ID
    const getSpaceById = async (id: number): Promise<Space | undefined> => {
        setLoading(true);
        setError(null);
        try {
            const space = await spacesService.getSpaceById(id);
            return space;
        } catch (err: any) {
            setError(err.message || 'Failed to fetch space');
            console.error('Error fetching space:', err);
        } finally {
            setLoading(false);
        }
    };

    // Search spaces
    const searchSpaces = async (filters: any): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const data = await spacesService.searchSpaces(filters);
            setSpaces(data);
        } catch (err: any) {
            setError(err.message || 'Failed to search spaces');
            console.error('Error searching spaces:', err);
        } finally {
            setLoading(false);
        }
    };

    // Create space
    const createSpace = async (spaceData: any): Promise<Space> => {
        setLoading(true);
        setError(null);
        try {
            const newSpace = await spacesService.createSpace(spaceData);
            setSpaces(prev => [...prev, newSpace]);
            return newSpace;
        } catch (err: any) {
            setError(err.message || 'Failed to create space');
            console.error('Error creating space:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Update space
    const updateSpace = async (id: number, spaceData: any): Promise<Space> => {
        setLoading(true);
        setError(null);
        try {
            const updatedSpace = await spacesService.updateSpace(id, spaceData);
            setSpaces(prev => prev.map(space => 
                space.id === id ? updatedSpace : space
            ));
            return updatedSpace;
        } catch (err: any) {
            setError(err.message || 'Failed to update space');
            console.error('Error updating space:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Delete space
    const deleteSpace = async (id: number): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await spacesService.deleteSpace(id);
            setSpaces(prev => prev.filter(space => space.id !== id));
        } catch (err: any) {
            setError(err.message || 'Failed to delete space');
            console.error('Error deleting space:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Initialize by fetching spaces on mount
    useEffect(() => {
        fetchSpaces();
    }, []);

    return {
        spaces,
        loading,
        error,
        fetchSpaces,
        getSpaceById,
        searchSpaces,
        createSpace,
        updateSpace,
        deleteSpace
    };
};
