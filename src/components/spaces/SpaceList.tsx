import React, { useState, useEffect } from 'react';
import SpaceCard from './SpaceCard';
import conferenceHall from '../../assets/confrece hall.jpg';
import eventHall from '../../assets/event hall.jpg';
import lab from '../../assets/lab.jpg';

// Mock data for spaces (in a real app, this would come from an API)
const MOCK_SPACES = [
  {
    id: 1,
    name: 'Conference Room A',
    capacity: 50,
    features: ['Projector', 'Videoconferencing', 'Whiteboards'],
    image: conferenceHall,
    availability: true
  },
  {
    id: 2,
    name: 'Meeting Room B',
    capacity: 15,
    features: ['TV Screen', 'Whiteboard', 'Coffee Service'],
    image: conferenceHall,
    availability: true
  },
  {
    id: 3,
    name: 'Event Hall',
    capacity: 200,
    features: ['Stage', 'Sound System', 'Catering Area'],
    image: eventHall,
    availability: false
  },
  {
    id: 4,
    name: 'Training Lab',
    capacity: 30,
    features: ['Computers', 'Interactive Board', 'Training Equipment'],
    image: lab,
    availability: true
  },
];

type Space = {
  id: number;
  name: string;
  capacity: number;
  features: string[];
  image?: string;
  availability: boolean;
};

const SpaceList: React.FC = () => {
  const [spaces, setSpaces] = useState<Space[]>(MOCK_SPACES);
  const [loading, setLoading] = useState(false);
  
  // Fetch spaces - simulating API call
  useEffect(() => {
    // In a real app, you would fetch data from API:
    // const fetchSpaces = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await fetch('/api/spaces');
    //     const data = await response.json();
    //     setSpaces(data);
    //   } catch (error) {
    //     console.error('Error fetching spaces:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchSpaces();
    
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {spaces.map(space => (
        <SpaceCard key={space.id} space={space} />
      ))}
    </div>
  );
};

export default SpaceList;
