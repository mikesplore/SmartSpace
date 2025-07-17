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
    <form onSubmit={handleSubmit} noValidate>
      <h2>Create a New Booking</h2>

      <div>
        <label>
          Event Name:
          <input
            type="text"
            name="eventName"
            value={form.eventName}
            onChange={handleChange}
          />
        </label>
        {errors.eventName && <span style={{ color: 'red' }}>{errors.eventName}</span>}
      </div>

      <div>
        <label>
          Space:
          <select name="space" value={form.space} onChange={handleChange}>
            <option value="">Select a space</option>
            <option value="Conference Room">Conference Room</option>
            <option value="Auditorium">Auditorium</option>
            <option value="Meeting Pod">Meeting Pod</option>
          </select>
        </label>
        {errors.space && <span style={{ color: 'red' }}>{errors.space}</span>}
      </div>

      <div>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </label>
        {errors.date && <span style={{ color: 'red' }}>{errors.date}</span>}
      </div>

      <div>
        <label>
          Start Time:
          <input
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
          />
        </label>
        {errors.startTime && <span style={{ color: 'red' }}>{errors.startTime}</span>}
      </div>

      <div>
        <label>
          End Time:
          <input
            type="time"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
          />
        </label>
        {errors.endTime && <span style={{ color: 'red' }}>{errors.endTime}</span>}
      </div>

      <div>
        <label>
          Number of Attendees:
          <input
            type="number"
            name="attendees"
            min={1}
            value={form.attendees}
            onChange={handleChange}
          />
        </label>
        {errors.attendees && <span style={{ color: 'red' }}>{errors.attendees}</span>}
      </div>

      <button type="submit">Book Now</button>

      {submitted && <p style={{ color: 'green' }}>Booking submitted successfully!</p>}
    </form>
  );
};

export default BookingForm;
