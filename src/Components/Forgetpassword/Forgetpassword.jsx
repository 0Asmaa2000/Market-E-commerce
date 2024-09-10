import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Forgetpassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!email) {
      setApiError('Please enter your email.');
      return;
    }
    setIsLoading(true);
    setApiError('');
    setSuccessMessage('');
    
    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email });

      console.log('Response:', response); 

      setSuccessMessage('A reset code has been sent to your email.');
      navigate(`/resetcode?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error('Error:', error);
      setApiError(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-32">
      <h2 className="text-center text-2xl font-semibold text-blue-800 mt-8">Forgot Password</h2>
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
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mb-3"
          autoComplete="email"
        />
        <button
          onClick={handleForgotPassword}
          disabled={isLoading}
          className="text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
        >
          {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default  Forgetpassword;

