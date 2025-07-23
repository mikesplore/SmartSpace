import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Welcome Back</h1>
        <p className="text-slate-600 mt-2">Sign in to your account</p>
      </div>
      
      <LoginForm />
      
      <div className="text-center mt-8">
        <p className="text-slate-600">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium transition">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
