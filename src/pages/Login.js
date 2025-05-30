import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Check server health
      const isHealthy = await api.checkHealth();
      if (!isHealthy) {
        throw new Error('Server is not responding. Please try again later.');
      }

      const data = await api.post('/auth/login', {
        email: form.email,
        password: form.password,
      });

      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect to home page
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      if (err.message.includes('Invalid email or password')) {
        setError('Invalid email or password');
      } else if (err.message.includes('suspended')) {
        setError('Your account has been suspended. Please contact support.');
      } else {
        setError(err.message || 'An error occurred during login. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-none">
          <h2 className="text-2xl font-semibold text-center mb-8">Log in to your account</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border-b border-gray-300 focus:border-primary outline-none py-2 px-1 bg-transparent placeholder-gray-500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border-b border-gray-300 focus:border-primary outline-none py-2 px-1 bg-transparent placeholder-gray-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 text-white font-semibold py-2 rounded mt-4 hover:bg-red-600 transition disabled:opacity-60"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center border border-gray-300 py-2 rounded mt-2 hover:bg-gray-50 transition"
            >
              <FaGoogle className="mr-2 text-lg" /> Log in with Google
            </button>
            {error && (
              <div className="text-red-500 text-sm text-center mt-2 bg-red-50 p-2 rounded">
                {error}
              </div>
            )}
          </form>
          <div className="text-center mt-6 text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline font-medium">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 