import React from 'react'
import style from './Electronics.module.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
Link
export default function Products() {
  function getProduct(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
   
     }
     let {data , isError,error,isLoading,isFetching} =useQuery({
       queryKey:['recentProduct'],
       queryFn:getProduct,
       staleTime:7000,
       gcTime:1000,
       select:(data)=>data.data.data.filter(product=>product.category.name=='Electronics'),
       
     })
     if(isError){
       return <h3>{error}</h3>
     }
     
     if(isLoading){
       return <div className="spinner">
       <div className="bounce1"></div>
       <div className="bounce2"></div>
       <div className="bounce3"></div>
     </div>
     }
     

     return (
      <div className="row flex flex-wrap -mx-2 mt-16">
      {data.map((product) => (
        <div key={product.id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4'>
          <div className="product p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-300 ease-in-out">
            <Link to={`/productdetails/${product.id}/${product.category.name}`} className="block">
              <img src={product.imageCover} className='w-full h-96 object-cover rounded-t-lg' alt={product.title} />
            <div className="collection flex justify-between mt-4 "> 
              <div className="collection11 mb-2">
              <h3 className='text-emerald-700 p-1 text-sm'>{product.category.name}</h3>
            <h3 className='text-slate-800 font-semibold text-sm mb-1'>{product.title.split(' ').slice(0,2).join('')}</h3>

              </div>
<div className="collection2">
<button className='w-full  text-emerald-700  rounded-lg'>
              <i className='fa-solid fa-cart-shopping mr-2'></i>
            </button>
</div>
          
               </div>
              
              <div className='flex justify-between text-sm p-1'>
                <span>{product.price} EGP</span>
                <span><i className='fas fa-star text-yellow-400 mr-1'></i>{product.ratingsAverage}</span>
              </div>
            </Link>
           
          </div>
        </div>
      ))}
    </div>
    
     )  
}
