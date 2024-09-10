import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";
import toast from 'react-hot-toast';
import axios from 'axios'
import { CartContext } from '../../Context/CartContext';
useParams
Link
axios
export default function ProductDetails() {
  const [product, setproduct] = useState(null)
  const [relatedProducts, setrelatedProducts] = useState([])
  const { addProductToCart ,setnumberItems,numberItems} = useContext(CartContext);

  let {id ,category} = useParams()
  function getproductDetails(id){
   axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((res)=>{setproduct(res.data.data)})
    .catch((res)=>{console.log("res");
    })
  }

  const addToCart = async (id) => {
    try {
      const response = await addProductToCart(id);
      if (response.data.status === 'success') {
        toast.success(response.data.message);
        setnumberItems(numberItems+1)

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };
  function getAllProducts(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((res)=>{
      let related =res.data.data.filter((product)=>product.category.name == category)

     setrelatedProducts(related);

    })

   
  }

useEffect(()=>{
  getproductDetails(id)
  getAllProducts()}
,[id ,category])  ;
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay:true,
  autoplaySpeed:2000,
};


  return (
    <>
        <div className="flex flex-wrap items-center mt-8">
  <div className="w-full sm:w-1/2 lg:w-1/4 p-2">
    <Slider {...settings}>
      {product?.images.map((src, index) => (
        <img key={index} src={src} className="w-full" alt="Product Image" />
      ))}
    </Slider>
  </div>

  <div className="w-full sm:w-1/2 lg:w-3/4 p-4">
    <h3 className="font-semibold capitalize text-2xl">{product?.title}</h3>
    <h4 className="text-gray-600 my-4">{product?.description}</h4>
    <h4 className="">{product?.category.name}</h4>
    <div className="flex justify-between p-2 my-5">
      <span>{product?.price} EGP</span>
      <span><i className="fas fa-star text-yellow-400"></i> {product?.ratingsAverage} EGP</span>
    </div>
    <button className="btn" onClick={() => addToCart(product.id)}>Add To Cart</button>
  </div>
</div>

      
            <div className="flex flex-wrap gap-4">
  {relatedProducts.length > 0 ? relatedProducts.map((product) => (
    <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2">
      <div className="product">
        <Link to={`/productdetails/${product.id}/${product.category.name}`}>
          <img src={product.imageCover} className="w-full" alt={product.title} />
          <h3 className="text-emerald-700 p-1">{product.category.name}</h3>
          <h3 className="text-slate-800 font-semibold mb-1">
            {product.title.split(' ').slice(0, 2).join(' ')}
          </h3>
          <div className="flex justify-between p-1">
            <span>{product.price} EGP</span>
            <span><i className="fas fa-star text-yellow-400"></i> {product.ratingsAverage} EGP</span>
          </div>
        </Link>
        <button className="btn" onClick={() => addToCart(product.id)}>Add To Cart</button>
      </div>
    </div>
  )) : (
    <div className="spinner text-blue-800">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  )}
</div>


    </>
  )
}
