import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageGallery from './images';
import "react-image-gallery/styles/css/image-gallery.css";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

const SpaceDetails = () => {
  const { spaceId } = useParams();
  const [space, setSpace] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const response = await fetch(`/api/spaces/${spaceId}`); // adjust as needed
        const data = await response.json();
        setSpace(data);
      } catch (error) {
        console.error("Error fetching space:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpace();
  }, [spaceId]);

  if (loading) return <p>Loading...</p>;
  if (!space) return <p>Space not found</p>;

  const images = space.images.map((url: string) => ({
    original: url,
    thumbnail: url
  }));

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">{space.name}</h2>
      
      <ImageGallery items={images} />

      <div>
        <p><strong>Location:</strong> {space.location}</p>
        <p><strong>Price:</strong> KES {space.price}</p>
        <p><strong>Description:</strong> {space.description}</p>
        <p><strong>Amenities:</strong> {space.amenities?.join(', ')}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold">Availability</h3>
        <Calendar
          tileDisabled={({ date }) => {
            // Sample logic to disable booked dates
            const formatted = date.toISOString().split('T')[0];
            return space.bookedDates?.includes(formatted);
          }}
        />
      </div>
    </div>
  );
};

export default SpaceDetails;
