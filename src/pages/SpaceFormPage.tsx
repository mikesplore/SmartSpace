import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import SpaceForm from '../components/spaces/SpaceForm';

const SpaceFormPage: React.FC = () => {
  const { spaceId } = useParams<{ spaceId?: string }>();
  const isEditMode = !!spaceId;

  return (
    <>
      <Helmet>
        <title>{isEditMode ? 'Edit Space' : 'Add New Space'} | SmartSpace</title>
        <meta 
          name="description" 
          content={isEditMode 
            ? "Edit details of an existing space" 
            : "Add a new space to the system"
          } 
        />
      </Helmet>
      
      <div className="bg-gray-50 min-h-screen py-8">
        <SpaceForm />
      </div>
    </>
  );
};

export default SpaceFormPage;
