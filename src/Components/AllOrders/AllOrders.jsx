

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import style from './AllOrders.module.css';
import { jwtDecode } from 'jwt-decode';

export default function AllOrders() {
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {id} = jwtDecode(localStorage.getItem('userToken'))
  console.log(id);


  const [showSlider, setShowSlider] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);

  const handleSliderOpen = (images) => {
    setCurrentImages(images);
    setShowSlider(true);
  };

  const handleSliderClose = () => {
    setShowSlider(false);
    setCurrentImages([]);
  };

  async function getAllOrders() {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
      setOrders(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  
 
  useEffect(() => {
    getAllOrders();
  }, []);

  if (loading) return  <div className='flex justify-center items-center h-screen'>
  <i className='fas fa-spinner fa-spin text-4xl'></i>
</div>;
  if (error) return <p>Error: {error}</p>;

return (
  <>
  <div className="flex flex-wrap p-16">
    {orders.length > 0 ? (
      orders.map((order) => (
        <div key={order._id} className="w-full md:w-1/3 p-2">
          <div className="bg-gray-100 p-4 rounded shadow-md">
            <h3 className="text-lg font-bold">Address: {order.shippingAddress ? ` ${order.shippingAddress.city}` : 'N/A'}</h3>
            <h3 className="text-xl">Total Order Price: ${order.totalOrderPrice}</h3>
            <h3 className="text-md">Payment Method: {order.paymentMethodType}</h3>
            
            <button
              className="mt-4 bg-blue-800 text-white px-4 py-2 rounded"
              onClick={() => handleSliderOpen(order.cartItems)}
            >
              Show Order
            </button>
          </div>
        </div>
      ))
    ) : (
      <p>No orders available</p>
    )}
  </div>

  {/* Slider Component */}
  {showSlider && (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg relative max-w-2xl mx-auto">
        <button
          className="absolute top-2 right-2 text-black text-2xl"
          onClick={handleSliderClose}
          aria-label="Close Slider"
        >
          &times;
        </button>
        <div className="flex flex-col overflow-y-scroll max-h-96">
          {currentImages.map((img, index) => (
            <div key={index} className="w-64 p-8 bg-blue-800">
              <img
                src={img.product.imageCover}
                alt={`Slider image ${index + 1}`}
                className="w-full h-auto object-cover"
              />
              <p className="mt-4 text-center text-4xl  text-white">
                  {img.product.name}
                </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}
</>
);
};


