import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import conferenceHall from '../../assets/confrece hall.jpg';
import eventHall from '../../assets/event hall.jpg';
import lab from '../../assets/lab.jpg';

// Mock space data (in a real app, this would come from an API)
const MOCK_SPACE = {
  id: 1,
  name: 'Conference Room A',
  description: 'A spacious conference room ideal for large meetings and presentations. Features large windows with natural lighting, comfortable seating, and state-of-the-art audiovisual equipment.',
  location: 'Main Building, 1st Floor',
  capacity: 50,
  pricePerHour: 75,
  fullDayPrice: 500,
  features: [
    'Projector',
    'Videoconferencing',
    'Whiteboards',
    'High-speed Wi-Fi',
    'Natural lighting',
    'Adjustable climate control',
    'Ergonomic chairs',
    'Water service',
    'Catering available'
  ],
  images: [
    conferenceHall,
    eventHall,
    lab
  ],
  availability: true,
  bookedDates: ['2025-07-20', '2025-07-21', '2025-07-25'],
  bookedSlots: [
    { date: '2025-07-18', slots: ['09:00-12:00', '15:00-17:00'] },
    { date: '2025-07-19', slots: ['13:00-18:00'] }
  ],
  rating: 4.8,
  reviewCount: 24
};

type Space = {
  id: number;
  name: string;
  description: string;
  location: string;
  capacity: number;
  pricePerHour: number;
  fullDayPrice: number;
  features: string[];
  images: string[];
  availability: boolean;
  bookedDates: string[];
  bookedSlots: {
    date: string;
    slots: string[];
  }[];
  rating: number;
  reviewCount: number;
};

type BookingTime = {
  date: Date | null;
  startTime: string;
  endTime: string;
};

const SpaceDetails: React.FC = () => {
  const { spaceId } = useParams<{ spaceId: string }>();
  const [space, setSpace] = useState<Space | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'reviews'>('description');
  const [bookingTime, setBookingTime] = useState<BookingTime>({
    date: null,
    startTime: '09:00',
    endTime: '10:00'
  });
  
  // Calculate total hours and price
  const calculateTotalPrice = () => {
    if (!bookingTime.date || !bookingTime.startTime || !bookingTime.endTime || !space) {
      return 0;
    }
    
    const start = new Date(`1970-01-01T${bookingTime.startTime}`);
    const end = new Date(`1970-01-01T${bookingTime.endTime}`);
    
    // Calculate difference in hours
    const diffHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    
    return diffHours * space.pricePerHour;
  };

  useEffect(() => {
    // Simulate API call to fetch space details
    setLoading(true);
    
    // In a real app, fetch from API:
    // const fetchSpace = async () => {
    //   try {
    //     const response = await fetch(`/api/spaces/${spaceId}`);
    //     const data = await response.json();
    //     setSpace(data);
    //   } catch (error) {
    //     console.error("Error fetching space:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchSpace();
    
    // For demo, use mock data
    setTimeout(() => {
      setSpace(MOCK_SPACE);
      setLoading(false);
    }, 800);
  }, [spaceId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!space) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
        <div className="flex items-center">
          <div className="text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-red-700 font-medium">Space not found</p>
            <p className="text-sm text-red-600 mt-1">
              The requested space could not be found or may have been removed.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <Link to="/spaces" className="text-red-600 hover:text-red-800 font-medium">
            &larr; Return to spaces list
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm">
        <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
        <span className="mx-2 text-gray-500">/</span>
        <Link to="/spaces" className="text-gray-500 hover:text-gray-700">Spaces</Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-900 font-medium">{space.name}</span>
      </nav>

      {/* Space Details Header */}
      <div className="flex flex-col lg:flex-row justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{space.name}</h1>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-700">{space.rating}</span>
              <span className="ml-1 text-sm text-gray-500">({space.reviewCount} reviews)</span>
            </div>
            <span className="mx-2 text-gray-300">|</span>
            <div className="flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {space.location}
            </div>
          </div>
        </div>
        
        <div className="mt-4 lg:mt-0">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-800">${space.pricePerHour}</span>
            <span className="ml-1 text-gray-600">/hour</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">${space.fullDayPrice}/full day</div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mb-8">
        <div className="grid grid-cols-3 gap-4 h-96">
          {space.images.map((image, index) => (
            <div 
              key={index} 
              className={`rounded-lg overflow-hidden ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
            >
              <img 
                src={image} 
                alt={`${space.name} - View ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Content Section */}
        <div className="lg:col-span-2">
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'description'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'features'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Features & Amenities
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews ({space.reviewCount})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">About this space</h3>
                <p className="text-gray-600 mb-4">{space.description}</p>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mt-6">
                  <h4 className="font-medium text-blue-800 mb-2">Space Specifications</h4>
                  <div className="grid grid-cols-2 gap-y-2">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="text-gray-700">Capacity: {space.capacity} people</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <span className="text-gray-700">Room Size: 800 sq ft</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">Status: {space.availability ? 'Available' : 'Booked'}</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700">Available M-F, 8am-6pm</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Features & Amenities</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {space.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Customer Reviews</h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium">
                    Write a Review
                  </button>
                </div>
                
                {/* Sample reviews - in a real app, these would be fetched from an API */}
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">John D.</h4>
                        <div className="flex items-center mt-1">
                          <div className="flex text-yellow-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                          <span className="ml-2 text-sm text-gray-500">June 28, 2025</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-gray-600">
                      Excellent space for our team meeting! The AV equipment worked flawlessly and the natural lighting made the 3-hour session much more pleasant.
                    </p>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">Sarah M.</h4>
                        <div className="flex items-center mt-1">
                          <div className="flex text-yellow-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                          <span className="ml-2 text-sm text-gray-500">July 3, 2025</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-gray-600">
                      Perfect for our client presentation. The videoconferencing setup allowed us to connect with remote team members seamlessly. Would book again!
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View all {space.reviewCount} reviews
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Booking Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Book this space</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <div className="relative">
                <Calendar
                  value={bookingTime.date}
                  onChange={(date) => setBookingTime({...bookingTime, date: date as Date})}
                  className="border border-gray-300 rounded-md w-full"
                  tileDisabled={({ date }) => {
                    // Disable past dates
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    
                    // Disable booked dates
                    const formatted = date.toISOString().split('T')[0];
                    return date < today || space.bookedDates.includes(formatted);
                  }}
                  tileClassName={({ date }) => {
                    const formatted = date.toISOString().split('T')[0];
                    return space.bookedDates.includes(formatted) ? 'text-red-500' : null;
                  }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <select
                  value={bookingTime.startTime}
                  onChange={(e) => setBookingTime({...bookingTime, startTime: e.target.value})}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <select
                  value={bookingTime.endTime}
                  onChange={(e) => setBookingTime({...bookingTime, endTime: e.target.value})}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Price per hour</span>
                <span className="font-medium">${space.pricePerHour.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Estimated total</span>
                <span className="font-semibold">${calculateTotalPrice().toFixed(2)}</span>
              </div>
              
              <button
                disabled={!bookingTime.date}
                className={`w-full py-3 px-4 rounded-md font-medium text-white ${
                  bookingTime.date
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-blue-300 cursor-not-allowed'
                } transition`}
              >
                {bookingTime.date ? 'Book Now' : 'Select a date'}
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                You won't be charged until you confirm your booking.
              </p>
            </div>
            
            <div className="mt-6 flex items-center justify-center">
              <span className="text-sm text-gray-500">
                Need help? <a href="#" className="text-blue-600 hover:text-blue-800">Contact support</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetails;
