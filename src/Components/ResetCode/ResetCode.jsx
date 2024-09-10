import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ResetCode() {
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isCodeVerified, setIsCodeVerified] = useState(false); 
  const location = useLocation();
  const navigate = useNavigate();

  const handleVerifyCode = async () => {
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');
    if (!resetCode) {
      setApiError('Please enter the reset code.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
        email,
        resetCode
      });
      setIsCodeVerified(true);
      setSuccessMessage('Reset code verified successfully. You can now set a new password.');
      setApiError('');
    } catch (error) {
      setApiError(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');
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
        {!isCodeVerified ? (
          <>
            <input
              type="text"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              placeholder="Enter reset code"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mb-3"
            />
            <button
              onClick={handleVerifyCode}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Verify Code'}
            </button>
          </>
        ) : (
          <>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mb-3"
              autoComplete="new-password"
            />
            <button
              onClick={handleResetPassword}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Reset Password'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
