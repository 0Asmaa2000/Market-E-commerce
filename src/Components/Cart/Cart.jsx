
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cartImage from '../../assets/images/images.png'
export default function Cart() {
  const { getLoggedUsercart, updateCartProductQuantit, deletCartItem, clearCart } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(false); 
  // Function to fetch cart items
  async function getCartItem() {
    try {
      setLoading(true); 
      const response = await getLoggedUsercart();
      if (response.data.status === 'success') {
        setCartDetails(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch cart items');
    } finally {
      setLoading(false); 
    }
  }

  // Function to update product quantity
  async function updateProduct(id, count) {
    if (count === 0) {
      await deleteItem(id);
    } else {
      try {
        const response = await updateCartProductQuantit(id, count);
        if (response.data.status === 'success') {
          setCartDetails(response.data.data);

          toast.success('Product updated successfully');
        } else {
          toast.error('Error updating product');
        }
      } catch (error) {
        toast.error('Error updating product');
      }
    }
  }
  

  // Function to delete a cart item
  async function deleteItem(productId) {
    try {
      const response = await deletCartItem(productId);
      if (response.data.status === 'success') {
        setCartDetails(response.data.data);
        toast.success('Item removed successfully');
      } else {
        toast.error('Error removing item');
      }
    } catch (error) {
      toast.error('Error removing item');
    }
  }

  
  // Function to clear the entire cart
  async function clearItem() {
    try {
      const response = await clearCart();
      if (response.data.message === 'success') {
        console.log(response)
        setCartDetails(null); 
        // await getCartItem(); 
        toast.success('Cart has been cleared');
      } else {
        toast.error('Error clearing cart');
        console.log(response)

      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Error clearing cart');
    }
  }
  

  // Fetch cart items when component mounts
  useEffect(() => {
    getCartItem();
  }, []);

  return (
    <>
  {loading ? (
    <div className='flex justify-center items-center h-screen '>
      <i className='fas fa-spinner fa-spin text-4xl text-blue-600'></i>
    </div>
  ) : cartDetails?.products.length > 0 ? (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-16 ">
      <table className="w-[80%] mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 p-16" >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3 md:px-6 md:py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-3 py-3 md:px-6 md:py-3">Product</th>
            <th scope="col" className="px-3 py-3 md:px-6 md:py-3">Qty</th>
            <th scope="col" className="px-3 py-3 md:px-6 md:py-3">Price</th>
            <th scope="col" className="px-43 py-3 md:px-6 md:py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartDetails.products.map((product) => (
            <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-2 md:p-4">
                <img src={product.product.imageCover} className="w-16 md:w-24 lg:w-32 max-w-full max-h-full object-cover" alt={product.product.title} />
              </td>
              <td className="px-2 md:px-4 py-4 font-semibold text-gray-900 dark:text-white">{product.product.title.split(' ').slice(0, 2).join(' ')}</td>
              <td className="px-2 md:px-4 py-4">
                <div className="flex items-center">
                  <button onClick={() => updateProduct(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-2 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Decrease Quantity</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>
                  <div>
                    <span>{product.count}</span>
                  </div>
                  <button onClick={() => updateProduct(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Increase Quantity</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-2 md:px-4 py-4 font-semibold text-gray-900 dark:text-white">{product.price * product.count} EGP</td>
              <td className="px-2 md:px-4 py-4">
                <span onClick={() => deleteItem(product.product.id)} className="font-medium text-red-600 dark:text-red-500 cursor-pointer">Remove</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {cartDetails.products.length > 0 && (
        <>
          <h2 className='text-center p-4 text-blue-800 font-bold text-xl'><span className='text-slate-700'>Total Price:</span> {cartDetails.totalCartPrice} EGP</h2>
          <div className="buttons flex flex-col sm:flex-row justify-around gap-4 bg-inherit p-4">
            <button onClick={clearItem} className='btn'>Clear</button>
            <Link to='/checkout' className='btn text-center'>
              <button className='text-center'>Check Out</button>
            </Link>
          </div>
        </>
      )}
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center mt-20'>
      <img src={cartImage} className='w-[300px] md:w-[400px] mb-6' alt="Empty Cart" />
      <h1 className='font-bold text-red-800 capitalize text-center text-3xl md:text-4xl py-4'>There's No Item to Show</h1>
    </div>
  )}
</>

  );
}
