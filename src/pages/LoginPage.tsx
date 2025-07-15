import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="max-w-md mx-auto">
        <LoginForm />
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
