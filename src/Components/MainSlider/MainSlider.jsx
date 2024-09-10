import React from 'react'
import style from './MainSlider.module.css'
import Slider from "react-slick";

import slide1 from '../../assets/images/slider-image-1.jpeg'
import slide2 from '../../assets/images/slider-image-2.jpeg'
import slide3 from '../../assets/images/slider-image-3.jpeg'
import slide4 from '../../assets/images/grocery-banner.png'
import slide5 from '../../assets/images/grocery-banner-2.jpeg'
export default function MainSlider() {

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


<div className="flex flex-col md:flex-row my-8">

  <div className="md:w-3/4">
  <Slider {...settings}>
  <div className='w-full h-[400px] md:h-[300px] lg:h-[400px]'>
    <img src={slide3} className='w-full h-full object-cover' alt="Choklodine" />
  </div>
  <div className='w-full h-[400px] md:h-[300px] lg:h-[400px]'>
    <img src={slide4} className='w-full h-full object-cover' alt="vegetables" />
  </div>
  <div className='w-full h-[400px] md:h-[300px] lg:h-[400px]'>
    <img src={slide5} className='w-full h-full object-cover' alt="bread" />
  </div>
</Slider>

  </div>

  <div className="md:w-1/4 mt-4 md:mt-0">
    <img src={slide2} className='w-full h-[200px] object-cover md:h-[200px]' alt="choclate" />
    <img src={slide3} className='w-full h-[200px] object-cover md:h-[200px]' alt="Choklodine" />
  </div>
</div>


    </>
  )
}
