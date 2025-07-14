import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="max-w-md mx-auto">
        <RegisterForm />
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
