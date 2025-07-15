import React from 'react';
import { useParams } from 'react-router-dom';
import SpacesComponent from '../components/spaces/spaces';
import SpaceDetails from '../components/spaces/SpaceDetails';
import { Helmet } from 'react-helmet-async';

const SpacesPage: React.FC = () => {
  const { spaceId } = useParams<{ spaceId?: string }>();

  return (
    <>
      <Helmet>
        <title>{spaceId ? 'Space Details' : 'Spaces'} | SmartSpace</title>
        <meta 
          name="description" 
          content={spaceId 
            ? "View and book this space for your next event" 
            : "Browse and book available spaces for your events and meetings"
          } 
        />
      </Helmet>
      
      <main className="bg-gray-50 min-h-screen">
        {spaceId ? <SpaceDetails /> : <SpacesComponent />}
      </main>
    </>
  );
};

export default SpacesPage;
