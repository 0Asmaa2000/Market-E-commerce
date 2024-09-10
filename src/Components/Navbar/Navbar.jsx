import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function Checkout() { 
  const { checkOut } = useContext(CartContext);
  const { cardId } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false); 

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: () => handleCheckout(cardId, 'http://localhost:5173'),
  });

  async function handleCheckout(cartId, url) {
    setIsLoading(true); 
    try {
      const { data } = await checkOut(cartId, url, formik.values);
      toast.success('Checkout completed successfully!');
      window.location.href = data.session.url; 
    } catch (error) {
      toast.error('Something went wrong during the checkout process!');
    } finally {
      setIsLoading(false); 
    }
  }

  return (
    <>
      <div className='py-2'>
        <h1 className='text-center mt-40'>CheckOut Now</h1>

        <form className="max-w-md mx-auto my-40" onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input 
              type="text" 
              onBlur={formik.handleBlur} 
              onChange={formik.handleChange}  
              value={formik.values.details} 
              name="details" 
              id="details" 
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:border-blue-600 peer" 
              placeholder=" "  
            />
            <label htmlFor="details" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Enter Your details
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input 
              type="tel" 
              onBlur={formik.handleBlur} 
              onChange={formik.handleChange}  
              value={formik.values.phone} 
              name="phone" 
              id="phone" 
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:border-blue-600 peer" 
              placeholder=" "  
            />
            <label htmlFor="phone" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Enter Your phone
            </label>
            {formik.errors.phone && formik.touched.phone ? (
              <div className='text-red-700 text-sm mb-3 p-2 text-center'>{formik.errors.phone}</div>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input 
              type="text" 
              onBlur={formik.handleBlur} 
              onChange={formik.handleChange}  
              value={formik.values.city} 
              name="city" 
              id="city" 
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:border-blue-600 peer" 
              placeholder=" "  
            />
            <label htmlFor="city" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Enter Your city
            </label>
            {formik.errors.city && formik.touched.city ? (
              <div className='text-red-700 text-sm mb-3 p-2 text-center'>{formik.errors.city}</div>
            ) : null}
          </div>

          <div className='flex items-center gap-4'>
            <button 
              type="submit" 
              className="text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={isLoading} 
            >
              {isLoading ? (
                <div className="flex justify-center items-center text-white">
                  <i className='fas fa-spinner fa-spin mr-2'></i>Processing...
                </div>
              ) : (
                'Check'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
