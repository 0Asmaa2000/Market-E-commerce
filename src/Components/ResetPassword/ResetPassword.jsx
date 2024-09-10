
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');

    if (!email) {
      setApiError('Email is missing. Please check the link.');
    }
  }, [location.search]);

  const handleResetPassword = async () => {
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');
    
    if (!email) {
      setApiError('Email is missing. Please check the link.');
      return;
    }
    
    if (!newPassword) {
      setApiError('Please enter a new password.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        email,
        newPassword
      });
      setSuccessMessage('Your password has been reset successfully.');
      setApiError('');
      navigate('/login'); 
    } catch (error) {
      setApiError(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-32">
      <h2 className="text-center text-2xl font-semibold text-blue-800 mt-8">Reset Password</h2>
      <div className="max-w-md mx-auto py-10">
        {apiError && (
          <div className="w-full bg-red-600 text-white font-bold rounded-lg p-2 text-center mb-3">
            {apiError}
          </div>
        )}
        {successMessage && (
          <div className="w-full bg-green-600 text-white font-bold rounded-lg p-2 text-center mb-3">
            {successMessage}
          </div>
        )}
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 my-8"
        />
        <button
          onClick={handleResetPassword}
          className="text-white bg-blue-800 hover:bg-blue-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
        >
          {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Reset Password'}
        </button>
      </div>
    </div>
  );
}
