import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProducts.module.css'
import axios from 'axios';
import ProductDetails from '../ProductDetails/ProductDetails';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
export default function RecentProducts() {
  let {addProductToCart,setnumberItems,numberItems} = useContext(CartContext)
  const [loading, setloading] = useState(false)
  const [currntId, setcurrntId] = useState(0)

 async function addToCart(id){
  setcurrntId(id)
  setloading(true)
 let response = await addProductToCart(id)
 console.log(response.data.message);
 if (response.data.status=='success'){
toast.success(response.data.message)
setnumberItems(numberItems)

setloading(false)

 }
 else {
  toast.error(response.data.message)
  setloading(false)

 }
  }
 
  function getProduct(){
 return   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)

  }
  let {data , isError,error,isLoading,isFetching} =useQuery({
    queryKey:['recentProduct'],
    queryFn:getProduct,
   staleTime:7000,
    gcTime:1000,
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
  <div className="row">
    {data?.data?.data.map((product)=>(
      <div key={product.id} className='w-1/6'>
    
<div  className="product p-2">
<Link to={`/productdetails/${product.id}/${product.category.name}`}>
<img src={product.imageCover} className='w-full' alt="" />
<h3 className='text-blue-800 p-1'>{product.category.name}</h3>
<h3 className='text-slate-800 font-semibold mb-1'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
<div className='flex justify-between p-1'>
<span>{product.price} EGP</span>
<span><i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage} EGP</span>
</div>
</Link>

<button className='btn' onClick={()=>addToCart(product.id)}>{loading &&currntId==product.id ? (<i className='fas fa-spinner fa-spin'></i>):('Add To Cart')}</button>
</div>
    </div>))}
  </div> 
  )
}
