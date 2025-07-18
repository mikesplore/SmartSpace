import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import conferenceHall from '../../assets/confrece hall.jpg';
import eventHall from '../../assets/event hall.jpg';
import lab from '../../assets/lab.jpg';

// Mock data for spaces
const MOCK_SPACES = [
  {
    id: 1,
    name: 'Conference Room A',
    capacity: 50,
    features: ['Projector', 'Videoconferencing', 'Whiteboards'],
    image: conferenceHall,
    description: 'A spacious conference room ideal for large meetings and presentations.',
    availability: true,
    pricePerHour: 75,
    location: 'Main Building, 1st Floor'
  },
  {
    id: 2,
    name: 'Meeting Room B',
    capacity: 15,
    features: ['TV Screen', 'Whiteboard', 'Coffee Service'],
    image: conferenceHall,
    description: 'Perfect for team meetings and small group discussions.',
    availability: true,
    pricePerHour: 40,
    location: 'Main Building, 2nd Floor'
  },
  {
    id: 3,
    name: 'Event Hall',
    capacity: 200,
    features: ['Stage', 'Sound System', 'Catering Area', 'Multiple Screens'],
    image: eventHall,
    description: 'Large venue for conferences, parties and corporate events.',
    availability: false,
    pricePerHour: 250,
    location: 'East Wing, Ground Floor'
  },
  {
    id: 4,
    name: 'Training Lab',
    capacity: 30,
    features: ['Computers', 'Interactive Board', 'Training Equipment'],
    image: lab,
    description: 'Equipped facility for workshops and technical training sessions.',
    availability: true,
    pricePerHour: 100,
    location: 'West Wing, 3rd Floor'
  },
];

// Type definitions
type Space = {
  id: number;
  name: string;
  capacity: number;
  features: string[];
  image?: string;
  description: string;
  availability: boolean;
  pricePerHour: number;
  location: string;
};

type FilterOptions = {
  minCapacity: number | null;
  maxCapacity: number | null;
  selectedFeatures: string[];
  onlyAvailable: boolean;
};

const SpacesComponent: React.FC = () => {
  const [spaces, setSpaces] = useState<Space[]>(MOCK_SPACES);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    minCapacity: null,
    maxCapacity: null,
    selectedFeatures: [],
    onlyAvailable: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState<'name' | 'capacity' | 'price'>('name');

  // All available features across all spaces
  const allFeatures = Array.from(
    new Set(spaces.flatMap(space => space.features))
  ).sort();

  // Filter spaces based on search term and filters
  const filteredSpaces = spaces.filter(space => {
    // Search term filter
    const matchesSearch = 
      searchTerm === '' || 
      space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      space.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      space.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Capacity filter
    const matchesMinCapacity = filters.minCapacity === null || space.capacity >= filters.minCapacity;
    const matchesMaxCapacity = filters.maxCapacity === null || space.capacity <= filters.maxCapacity;
    
    // Features filter
    const matchesFeatures = 
      filters.selectedFeatures.length === 0 || 
      filters.selectedFeatures.every(feature => space.features.includes(feature));
    
    // Availability filter
    const matchesAvailability = !filters.onlyAvailable || space.availability;
    
    return matchesSearch && matchesMinCapacity && matchesMaxCapacity && matchesFeatures && matchesAvailability;
  });

  // Sort spaces
  const sortedSpaces = [...filteredSpaces].sort((a, b) => {
    if (sortOrder === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === 'capacity') {
      return b.capacity - a.capacity;
    } else if (sortOrder === 'price') {
      return a.pricePerHour - b.pricePerHour;
    }
    return 0;
  });

  // Handle feature selection
  const toggleFeature = (feature: string) => {
    setFilters(prev => {
      if (prev.selectedFeatures.includes(feature)) {
        return {
          ...prev,
          selectedFeatures: prev.selectedFeatures.filter(f => f !== feature)
        };
      } else {
        return {
          ...prev,
          selectedFeatures: [...prev.selectedFeatures, feature]
        };
      }
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      minCapacity: null,
      maxCapacity: null,
      selectedFeatures: [],
      onlyAvailable: false
    });
    setSearchTerm('');
  };

  // In a real app, this would fetch spaces from API
  useEffect(() => {
    // Simulating API fetch
    // In production, replace with actual API call:
    // const fetchSpaces = async () => {
    //   try {
    //     const response = await fetch('/api/spaces');
    //     const data = await response.json();
    //     setSpaces(data);
    //   } catch (error) {
    //     console.error('Error fetching spaces:', error);
    //   }
    // };
    // fetchSpaces();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Available Spaces</h1>
        <p className="text-gray-600">Find and book the perfect space for your next event or meeting</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          {/* Search input */}
          <div className="w-full lg:w-1/3">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search spaces..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-gray-400 absolute left-3 top-[50%] transform -translate-y-1/2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Sort dropdown */}
          <div className="w-full lg:w-auto">
            <div className="relative">
              <label htmlFor="sort-order" className="sr-only">Sort spaces by</label>
              <select
              id="sort-order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'name' | 'capacity' | 'price')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Sort spaces by"
              >
              <option value="name">Sort by Name</option>
              <option value="capacity">Sort by Capacity (High to Low)</option>
              <option value="price">Sort by Price (Low to High)</option>
              </select>
            </div>
          </div>

          {/* Filter toggle button */}
          <div className="w-full lg:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          <div className="w-full lg:w-auto">
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-blue-600 hover:text-blue-800 hover:underline transition"
            >
              Reset All Filters
            </button>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-3">Filter Options</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Capacity filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Capacity</label>
                <input
                  type="number"
                  min="0"
                  value={filters.minCapacity || ''}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    minCapacity: e.target.value ? parseInt(e.target.value) : null
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Min people"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Capacity</label>
                <input
                  type="number"
                  min="0"
                  value={filters.maxCapacity || ''}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    maxCapacity: e.target.value ? parseInt(e.target.value) : null
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Max people"
                />
              </div>
              
              {/* Availability filter */}
              <div className="flex items-center mt-6">
                <input
                  id="availability-filter"
                  type="checkbox"
                  checked={filters.onlyAvailable}
                  onChange={() => setFilters(prev => ({
                    ...prev,
                    onlyAvailable: !prev.onlyAvailable
                  }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="availability-filter" className="ml-2 block text-sm text-gray-700">
                  Show only available spaces
                </label>
              </div>
            </div>

            {/* Features filters */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
              <div className="flex flex-wrap gap-2">
                {allFeatures.map(feature => (
                  <button
                    key={feature}
                    onClick={() => toggleFeature(feature)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filters.selectedFeatures.includes(feature)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } transition`}
                  >
                    {feature}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="mb-4 text-gray-600">
        {sortedSpaces.length} {sortedSpaces.length === 1 ? 'space' : 'spaces'} found
      </div>

      {/* Spaces grid */}
      {sortedSpaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSpaces.map((space) => (
            <div 
              key={space.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Space image */}
              <div className="h-48 relative">
                {space.image ? (
                  <img 
                    src={space.image} 
                    alt={space.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
                <div className="absolute top-0 right-0 m-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${
                    space.availability 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {space.availability ? 'Available' : 'Booked'}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">{space.name}</h3>
                
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {space.location}
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Capacity: {space.capacity}
                  </div>
                  
                  <div className="text-blue-600 font-semibold">
                    ${space.pricePerHour}/hr
                  </div>
                </div>
                
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-700">Features:</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {space.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700">
                        {feature}
                      </span>
                    ))}
                    {space.features.length > 3 && (
                      <span className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700">
                        +{space.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Link 
                    to={`/spaces/${space.id}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium"
                  >
                    View Details
                  </Link>
                  
                  <button 
                    className={`ml-auto px-4 py-2 rounded-md text-sm font-medium ${
                      space.availability 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    } transition`}
                    disabled={!space.availability}
                  >
                    {space.availability ? 'Book Now' : 'Unavailable'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 mx-auto text-gray-400 mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No spaces found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SpacesComponent;
