import React, { useEffect, useState } from 'react';

interface Space {
  id: string;
  name: string;
  description: string;
  images: string[];
  status: 'active' | 'inactive';
}

interface Props {
  spaceId: string;
  onSubmit: (updatedData: Space) => void;
}

const SpaceEditForm: React.FC<Props> = ({ spaceId, onSubmit }) => {
  const [formData, setFormData] = useState<Space | null>(null);
  const [loading, setLoading] = useState(true);
  const [newImage, setNewImage] = useState('');
  const [error, setError] = useState('');

  // Simulate fetching space data
  useEffect(() => {
    const fetchData = async () => {
      // Replace with actual API call
      const mockData: Space = {
        id: spaceId,
        name: 'Demo Space',
        description: 'This is a demo description.',
        images: ['img1.jpg', 'img2.jpg'],
        status: 'active',
      };
      setFormData(mockData);
      setLoading(false);
    };
    fetchData();
  }, [spaceId]);

  // Handle field change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (!formData) return;
    const { name, value } = e.target;
    // Ensure correct typing for status field
    if (name === 'status' && value !== 'active' && value !== 'inactive') return;
    setFormData({ ...formData, [name]: value });
  };

  // Toggle status
  const toggleStatus = (): void => {
    if (!formData) return;
    const newStatus: Space['status'] =
      formData.status === 'active' ? 'inactive' : 'active';
    setFormData({ ...formData, status: newStatus });
  };

  // Add image
  const addImage = (): void => {
    if (!formData || !newImage.trim()) return;
    setFormData({ ...formData, images: [...formData.images, newImage.trim()] });
    setNewImage('');
  };

  // Remove image
  const removeImage = (index: number): void => {
    if (!formData) return;
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  // Validate and submit
  const handleSubmit = (): void => {
    if (!formData) return;
    if (!formData.name || !formData.description) {
      setError('Name and description are required.');
      return;
    }
    setError('');
    onSubmit(formData);
  };

  if (loading || !formData) return <div>Loading...</div>;

  return (
    <div className="space-edit-form">
      <h2>Edit Space</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>

      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </label>

      <label>
        
        Status:
        <button type="button" onClick={toggleStatus} name="status">
          {formData.status === 'active' ? 'Deactivate' : 'Activate'}
        </button>
        <span style={{ marginLeft: 8 }}>Current: {formData.status}</span>
        
      </label>

      <div>
        <h4>Images:</h4>
        <ul>
          {formData.images.map((img, index) => (
            <li key={index}>
              {img}
              <button type="button" onClick={() => removeImage(index)} style={{ marginLeft: 8 }}>
                Remove
              </button>
            </li>
          ))}
        </ul>

        <input
          type="text"
          placeholder="Add image URL"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
        />
        <button type="button" onClick={addImage}>
          Add Image
        </button>
      </div>

      <br />

      <button onClick={handleSubmit}>Save Changes</button>
    </div>
  );
};

export default SpaceEditForm;