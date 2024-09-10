import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishContext } from '../../Context/WishContext';

export default function Product() {
  const { addProductToCart ,setnumberItems,numberItems} = useContext(CartContext);
  const { AddWishListToCart } = useContext(WishContext);

  const [cartLoading, setCartLoading] = useState(null); 
  const [wishLoading, setWishLoading] = useState(null); 
  const [selectedProducts, setSelectedProducts] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('selectedProducts') || '[]');
    setSelectedProducts(storedProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  const handleWishlistToggle = (id) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id];
      addToWish(id);
      return newSelected;
    });
  };

  const addToWish = async (id) => {
    setWishLoading(id); 
    try {
      const response = await AddWishListToCart(id);
      if (response.data.status === 'success') {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setWishLoading(null); 
    }
  };

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

  const getProduct = () => axios.get('https://ecommerce.routemisr.com/api/v1/products');

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['recentProduct'],
    queryFn: getProduct,
    staleTime: 7000,
    cacheTime: 1000,
  });

  if (isError) {
    return <h3>{error?.message || 'An error occurred'}</h3>;
  }

  if (isLoading) {
    return (
      <div className=" text-center flex justify-center items-center text-4xl text-blue-800">
      <i className='fas fa-spinner fa-spin'></i>
      </div>
    );
  }

  const filteredProducts = data?.data?.data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="search-bar mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mt-8 border border-gray-300 rounded-md"
        />
      </div>

      <div className="row flex flex-wrap w-auto mt-10 mx-auto">
        {filteredProducts.map((product) => (
          <div key={product.id} className="w-full md:w-1/3 lg:w-1/5 px-2 mb-4">
            <div className="product p-2 border rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-300">
              <Link to={`/productdetails/${product.id}/${product.category.name}`} className="block">
                <img
                  src={product.imageCover}
                  className="w-full h-auto object-cover rounded-t-lg"
                  alt={product.title}
                />
              </Link>
              <div className="collection flex justify-between items-center mt-2">
                <div className="collection2">
                  <h3 className="text-blue-800  font-semibold ">{product.category.name}</h3>
                  <h3 className="text-slate-800 font-semibold  mb-1">
                    {product.title.split(' ').slice(0, 2).join(' ')}
                  </h3>
                </div>
                <button
                  className="p-2 mt-2 rounded-full bg-transparent hover:bg-pink-200"
                  onClick={() => addToCart(product.id)}
                  disabled={cartLoading === product.id}
                >
                  {cartLoading === product.id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fa-solid fa-cart-shopping text-blue-800"></i>
                  )}
                </button>
                {/* <button
                  onClick={() => handleWishlistToggle(product.id)}
                  className={`p-2 mt-2 rounded-full ${selectedProducts.includes(product.id) ? 'bg-pink-200 hover:bg-yellow-100' : 'bg-pink-200 hover:bg-pink-200'}`}
                >
                  {wishLoading === product.id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <i
                      className={`fa-solid fa-heart ${selectedProducts.includes(product.id) ? 'text-red-600' : 'text-gray-100'}`}
                    ></i>
                  )}
                </button> */}
                <button
  onClick={() => handleWishlistToggle(product.id)}
  className={`p-2 mt-2 rounded-full ${selectedProducts.includes(product.id) ? 'bg-transparent' : 'bg-transparent hover:bg-pink-200'}`}
>
  {wishLoading === product.id ? (
    <i className="fas fa-spinner fa-spin"></i>
  ) : (
    <i
      className={`fa-solid fa-heart ${selectedProducts.includes(product.id) ? 'text-red-600' : 'text-gray-300'}`}
    ></i>
  )}
</button>
              </div>
              <div className="flex justify-between  p-1 font-semibold ">
                <span className=''>{product.price} EGP</span>
                <span className="flex items-center ">
                  <i className="fas fa-star text-yellow-400 mr-1"></i>
                  {product.ratingsAverage}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
