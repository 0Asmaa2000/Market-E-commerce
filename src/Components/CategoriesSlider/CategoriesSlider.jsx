
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import style from './CategoriesSlider.module.css'; 

export default function CategoriesSlider() {
  const [categories, setcategories] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1440, 
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
    ],
  };

  // جلب الفئات
  function getCategories() {
    axios.get('https://ecommerce.routemisr.com/api/v1/categories').then((res) => {
      setcategories(res.data.data);
    });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h2 className='my-3 capitalize font-bold text-2xl text-gray-800 text-center'>
        Shop Popular Categories
      </h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className='flex flex-col items-center p-2'>
            <img
              src={category.image}
              className='w-full h-[300px] md:h-[300px] lg:h-[300px] object-cover'
              alt={category.name}
            />
            <h4 className='mt-2 text-xs md:text-sm lg:text-base text-gray-800 text-center'>
              {category.name}
            </h4>
          </div>
        ))}
      </Slider>
    </>
  );
}
