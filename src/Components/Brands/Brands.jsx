import React from 'react';
import style from './Brands.module.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Brands() {
  function getPBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: getPBrands,
    staleTime: 7000,
    cacheTime: 1000,
    select: (data) => data.data.data,
  });

  if (isError) {
    return <h3>{error.message}</h3>; 
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center text-2xl justify-center h-full">
        <div className="fas fa-spinner fa-spin text-blue-600 text-3xl mb-2"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <h3>No brands available</h3>;
  }

  return (
    <div className="row flex flex-wrap -mx-2">
      {data.map((brand) => (
        <div key={brand._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
          <div className="product p-4 border rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <img src={brand.image} className="w-full h-auto object-contain rounded-t-lg" alt={brand.name} />
            <h5 className="text-center mt-2 text-lg font-semibold">{brand.name}</h5>
          </div>
        </div>
      ))}
    </div>
  );
}
