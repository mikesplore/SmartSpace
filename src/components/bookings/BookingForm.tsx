import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar, Clock, Users, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
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
  eventType: 'meeting' | 'conference' | 'webinar' | 'workshop';
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
  eventType: 'meeting',
};

const BookingForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { spaces, loading: spacesLoading } = useSpaces();
  const { createBooking, loading: bookingLoading } = useBookings();
  
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<string | null>(null);

  // Pre-fill form if space is selected via URL params
  useEffect(() => {
    const spaceId = searchParams.get('space');
    if (spaceId && spaces.length > 0) {
      setForm(prev => ({ ...prev, spaceId }));
    }
  }, [searchParams, spaces]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!form.eventName.trim()) newErrors.eventName = 'Event name is required';
    if (!form.spaceId) newErrors.spaceId = 'Space selection is required';
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.startTime) newErrors.startTime = 'Start time is required';
    if (!form.endTime) newErrors.endTime = 'End time is required';
    if (!form.organizerName.trim()) newErrors.organizerName = 'Organizer name is required';
    if (!form.organizerEmail.trim()) newErrors.organizerEmail = 'Organizer email is required';
    if (form.attendees < 1) newErrors.attendees = 'At least one attendee required';

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.organizerEmail && !emailRegex.test(form.organizerEmail)) {
      newErrors.organizerEmail = 'Please enter a valid email address';
    }

    // Validate time logic
    if (form.startTime && form.endTime && form.startTime >= form.endTime) {
      newErrors.endTime = 'End time must be after start time';
    }

    // Validate date is not in the past
    if (form.date) {
      const selectedDate = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }

    // Validate space capacity
    if (form.spaceId && form.attendees) {
      const selectedSpace = spaces.find(space => space.id.toString() === form.spaceId);
      if (selectedSpace && form.attendees > selectedSpace.capacity) {
        newErrors.attendees = `This space can only accommodate up to ${selectedSpace.capacity} people`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      const bookingData = {
        event_name: form.eventName,
        start_datetime: `${form.date}T${form.startTime}:00`,
        end_datetime: `${form.date}T${form.endTime}:00`,
        organizer_name: form.organizerName,
        organizer_email: form.organizerEmail,
        event_type: form.eventType,
        attendance: form.attendees,
        space: parseInt(form.spaceId),
      };

      await createBooking(bookingData);
      setSuccess('Booking submitted successfully! You will receive a confirmation once approved.');
      setForm(initialFormState);
      setErrors({});
      
      // Navigate to bookings list after success
      setTimeout(() => {
        navigate('/bookings');
      }, 2000);
    } catch (error: any) {
      setErrors({ submit: error.detail || 'Failed to submit booking. Please try again.' });
    }
  };

  const handleInputChange = (field: keyof BookingFormData, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const selectedSpace = spaces.find(space => space.id.toString() === form.spaceId);
  const isCapacityExceeded = selectedSpace && form.attendees > selectedSpace.capacity;

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Booking Submitted!</h3>
        <p className="text-gray-600">{success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.submit && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-red-800 text-sm">{errors.submit}</p>
        </div>
      )}

      {/* Event Details Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Name *
            </label>
            <input
              type="text"
              value={form.eventName}
              onChange={(e) => handleInputChange('eventName', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.eventName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter event name"
            />
            {errors.eventName && <p className="mt-1 text-sm text-red-600">{errors.eventName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Type *
            </label>
            <select
              value={form.eventType}
              onChange={(e) => handleInputChange('eventType', e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="meeting">Meeting</option>
              <option value="conference">Conference</option>
              <option value="webinar">Webinar</option>
              <option value="workshop">Workshop</option>
            </select>
          </div>
        </div>
      </div>

      {/* Space Selection */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Space & Capacity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Space *
            </label>
            <select
              value={form.spaceId}
              onChange={(e) => handleInputChange('spaceId', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.spaceId ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={spacesLoading}
            >
              <option value="">Choose a space</option>
              {spaces.map((space) => (
                <option key={space.id} value={space.id}>
                  {space.name} (Capacity: {space.capacity} people)
                </option>
              ))}
            </select>
            {errors.spaceId && <p className="mt-1 text-sm text-red-600">{errors.spaceId}</p>}
            
            {selectedSpace && (
              <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedSpace.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <Users className="w-4 h-4" />
                  <span>Up to {selectedSpace.capacity} people</span>
                </div>
                <div className="text-sm font-medium text-emerald-600 mt-1">
                  ${selectedSpace.price_per_hour}/hour
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Attendees *
            </label>
            <input
              type="number"
              min="1"
              value={form.attendees}
              onChange={(e) => handleInputChange('attendees', parseInt(e.target.value) || 1)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.attendees || isCapacityExceeded ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.attendees && <p className="mt-1 text-sm text-red-600">{errors.attendees}</p>}
            {isCapacityExceeded && !errors.attendees && (
              <p className="mt-1 text-sm text-red-600">
                Exceeds space capacity of {selectedSpace?.capacity} people
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Date & Time Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Date & Time</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date *
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.date ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time *
            </label>
            <input
              type="time"
              value={form.startTime}
              onChange={(e) => handleInputChange('startTime', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.startTime ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.startTime && <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Time *
            </label>
            <input
              type="time"
              value={form.endTime}
              onChange={(e) => handleInputChange('endTime', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.endTime ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.endTime && <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>}
          </div>
        </div>

        {form.startTime && form.endTime && form.startTime < form.endTime && (
          <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>
                Duration: {Math.round(((new Date(`1970-01-01T${form.endTime}:00`) as any) - (new Date(`1970-01-01T${form.startTime}:00`) as any)) / (1000 * 60 * 60) * 100) / 100} hours
              </span>
            </div>
            {selectedSpace && (
              <div className="text-sm font-medium text-emerald-600 mt-1">
                Estimated cost: ${(parseFloat(selectedSpace.price_per_hour) * 
                  Math.round(((new Date(`1970-01-01T${form.endTime}:00`) as any) - (new Date(`1970-01-01T${form.startTime}:00`) as any)) / (1000 * 60 * 60) * 100) / 100).toFixed(2)}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Organizer Details */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Organizer Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organizer Name *
            </label>
            <input
              type="text"
              value={form.organizerName}
              onChange={(e) => handleInputChange('organizerName', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.organizerName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter organizer name"
            />
            {errors.organizerName && <p className="mt-1 text-sm text-red-600">{errors.organizerName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organizer Email *
            </label>
            <input
              type="email"
              value={form.organizerEmail}
              onChange={(e) => handleInputChange('organizerEmail', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.organizerEmail ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter organizer email"
            />
            {errors.organizerEmail && <p className="mt-1 text-sm text-red-600">{errors.organizerEmail}</p>}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={bookingLoading || isCapacityExceeded}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors font-medium"
        >
          {bookingLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </>
          ) : (
            <>
              <Calendar className="w-5 h-5" />
              Submit Booking
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
