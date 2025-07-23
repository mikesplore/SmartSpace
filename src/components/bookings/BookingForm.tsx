import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpaces } from '../../hooks/useSpaces';
import { useBookings } from '../../hooks/useBookings';

interface BookingFormData {
  eventName: string;
  spaceId: string;
  date: string;
  startTime: string;
  endTime: string;
  attendees: number;
  organizerName: string;
  organizerEmail: string;
  eventType: 'internal' | 'external';
  resources: string[];
}

const initialFormState: BookingFormData = {
  eventName: '',
  spaceId: '',
  date: '',
  startTime: '',
  endTime: '',
  attendees: 1,
  organizerName: '',
  organizerEmail: '',
  eventType: 'internal',
  resources: [],
};

const BookingForm: React.FC = () => {
  const navigate = useNavigate();
  const { spaces, loading: spacesLoading } = useSpaces();
  const { createBooking, loading: bookingLoading } = useBookings();
  
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.eventName) newErrors.eventName = 'Event name is required';
    if (!form.spaceId) newErrors.spaceId = 'Space selection is required';
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.startTime) newErrors.startTime = 'Start time is required';
    if (!form.endTime) newErrors.endTime = 'End time is required';
    if (!form.organizerName) newErrors.organizerName = 'Organizer name is required';
    if (!form.organizerEmail) newErrors.organizerEmail = 'Organizer email is required';
    if (form.attendees < 1) newErrors.attendees = 'At least one attendee required';
    if (form.startTime && form.endTime && form.startTime >= form.endTime) {
      newErrors.endTime = 'End time must be after start time';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.organizerEmail && !emailRegex.test(form.organizerEmail)) {
      newErrors.organizerEmail = 'Please enter a valid email address';
    }
    
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'attendees' ? Number(value) : value,
    }));
  };

  const handleResourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const resource = e.target.value;
    setForm((prev) => ({
      ...prev,
      resources: e.target.checked
        ? [...prev.resources, resource]
        : prev.resources.filter((r) => r !== resource),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      try {
        const bookingData = {
          eventName: form.eventName,
          spaceId: form.spaceId,
          startDateTime: `${form.date}T${form.startTime}`,
          endDateTime: `${form.date}T${form.endTime}`,
          organizerName: form.organizerName,
          organizerEmail: form.organizerEmail,
          eventType: form.eventType,
          attendance: form.attendees,
          resources: form.resources,
        };

        await createBooking(bookingData);
        
        // Success - reset form and redirect
        setForm(initialFormState);
        navigate('/bookings');
      } catch (error) {
        console.error('Error creating booking:', error);
        setErrors({ submit: 'Failed to create booking. Please try again.' });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create a New Booking</h2>

      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Event Name:</label>
        <input
          type="text"
          name="eventName"
          value={form.eventName}
          onChange={handleChange}
          className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.eventName ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter event name"
        />
        {errors.eventName && <span className="text-red-500 text-sm">{errors.eventName}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Space:</label>
        <select
          name="spaceId"
          value={form.spaceId}
          onChange={handleChange}
          className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.spaceId ? 'border-red-500' : 'border-gray-300'}`}
          disabled={spacesLoading}
        >
          <option value="">Select a space</option>
          {spaces.map((space: any) => (
            <option key={space.id} value={space.id}>
              {space.name} - {space.location}
            </option>
          ))}
        </select>
        {spacesLoading && <span className="text-blue-500 text-sm">Loading spaces...</span>}
        {errors.spaceId && <span className="text-red-500 text-sm">{errors.spaceId}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Date:</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.date && <span className="text-red-500 text-sm">{errors.date}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Start Time:</label>
        <input
          type="time"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.startTime ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.startTime && <span className="text-red-500 text-sm">{errors.startTime}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">End Time:</label>
        <input
          type="time"
          name="endTime"
          value={form.endTime}
          onChange={handleChange}
          className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.endTime ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.endTime && <span className="text-red-500 text-sm">{errors.endTime}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Number of Attendees:</label>
        <input
          type="number"
          name="attendees"
          min={1}
          value={form.attendees}
          onChange={handleChange}
          className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.attendees ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.attendees && <span className="text-red-500 text-sm">{errors.attendees}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Organizer Name:</label>
        <input
          type="text"
          name="organizerName"
          value={form.organizerName}
          onChange={handleChange}
          className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.organizerName ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter organizer name"
        />
        {errors.organizerName && <span className="text-red-500 text-sm">{errors.organizerName}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Organizer Email:</label>
        <input
          type="email"
          name="organizerEmail"
          value={form.organizerEmail}
          onChange={handleChange}
          className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.organizerEmail ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter email address"
        />
        {errors.organizerEmail && <span className="text-red-500 text-sm">{errors.organizerEmail}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Event Type:</label>
        <select
          name="eventType"
          value={form.eventType}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="internal">Internal Event</option>
          <option value="external">External Event</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Required Resources:</label>
        <div className="space-y-2">
          {['Projector', 'Whiteboard', 'Video Conferencing', 'Catering', 'Sound System'].map((resource) => (
            <label key={resource} className="flex items-center">
              <input
                type="checkbox"
                value={resource}
                checked={form.resources.includes(resource)}
                onChange={handleResourceChange}
                className="mr-2"
              />
              {resource}
            </label>
          ))}
        </div>
      </div>

      {errors.submit && (
        <div className="text-red-600 text-center font-medium">{errors.submit}</div>
      )}

      <button
        type="submit"
        disabled={bookingLoading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-400"
      >
        {bookingLoading ? 'Creating Booking...' : 'Book Now'}
      </button>
    </form>
  );
};

export default BookingForm;
