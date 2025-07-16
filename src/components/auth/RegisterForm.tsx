import React, { useState } from 'react';
import { register } from '../../services/auth';
import type { RegisterData } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.ts';

type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirm: string;
};

export default function RegisterForm() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.password_confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    
    try {
      const result = await register(formData as RegisterData);
      
      if (result && result.error) {
        setError(result.error || 'Registration failed');
      } else if (result && result.token) {
        // Save token to localStorage
        localStorage.setItem('token', result.token);
        // Update user context
        setUser(result.user);
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full">
      <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password_confirm"
          placeholder="Confirm Password"
          value={formData.password_confirm}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

