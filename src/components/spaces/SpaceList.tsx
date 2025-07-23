import React from 'react';
import SpaceCard from './SpaceCard';
import { useSpaces } from '../../hooks/useSpaces';
import type { Space } from '../../services/spaces';
import conferenceHall from '../../assets/confrece hall.jpg';
import eventHall from '../../assets/event hall.jpg';
import lab from '../../assets/lab.jpg';

// Fallback images for spaces that don't have images
const getSpaceImage = (space: Space) => {
  if (space.image1) return space.image1;
  if (space.image2) return space.image2;
  if (space.image3) return space.image3;
  
  // Fallback based on capacity
  if (space.capacity > 100) return eventHall;
  if (space.capacity > 30) return conferenceHall;
  return lab;
};

const SpaceList: React.FC = () => {
  const { spaces, loading, error, fetchSpaces } = useSpaces();
  
  // Transform API spaces to component format
  const transformedSpaces = spaces.map(space => ({
    id: space.id,
    name: space.name,
    capacity: space.capacity,
    features: space.features ? space.features.split(',').map(f => f.trim()) : [],
    image: getSpaceImage(space),
    availability: space.status === 'free',
    location: space.location,
    price_per_hour: space.price_per_hour,
    description: space.description
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-600 mb-4">{error}</div>
        <button 
          onClick={fetchSpaces}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (transformedSpaces.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        No spaces available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {transformedSpaces.map((space: any) => (
        <SpaceCard key={space.id} space={space} />
      ))}
    </div>
  );
};

export default SpaceList;
