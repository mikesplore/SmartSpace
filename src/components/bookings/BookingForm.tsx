import React, { useState } from 'react';

interface BookingFormData {
  eventName: string;
  space: string;
  date: string;
  startTime: string;
  endTime: string;
  attendees: number;
}

const initialFormState: BookingFormData = {
  eventName: '',
  space: '',
  date: '',
  startTime: '',
  endTime: '',
  attendees: 1,
};

const BookingForm: React.FC = () => {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.eventName) newErrors.eventName = 'Event name is required';
    if (!form.space) newErrors.space = 'Space selection is required';
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.startTime) newErrors.startTime = 'Start time is required';
    if (!form.endTime) newErrors.endTime = 'End time is required';
    if (form.attendees < 1) newErrors.attendees = 'At least one attendee required';
    if (form.startTime && form.endTime && form.startTime >= form.endTime) {
      newErrors.endTime = 'End time must be after start time';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      // Submit booking logic here
      // Reset form if needed
      // setForm(initialFormState);
      //setForm(initialFormState);

    } else {
      setSubmitted(false);
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
          name="space"
          value={form.space}
          onChange={handleChange}
          className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.space ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="">Select a space</option>
          <option value="Conference Room">Conference Room</option>
          <option value="Auditorium">Auditorium</option>
          <option value="Meeting Pod">Meeting Pod</option>
        </select>
        {errors.space && <span className="text-red-500 text-sm">{errors.space}</span>}
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

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
      >
        Book Now
      </button>

      {submitted && (
        <p className="text-green-600 text-center font-medium mt-4">Booking submitted successfully!</p>
      )}
    </form>
  );
};

export default BookingForm;
