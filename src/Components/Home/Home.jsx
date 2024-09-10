import React from 'react'
import style from './Home.module.css'
// import RecentProducts from './../RecentProducts/RecentProducts';
import CategoriesSlider from './../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';
import Products from '../Products/Products';
import RecentProducts from '../Products/Products';

export default function Home() {
 
  return (
  <>
  <MainSlider/>
  <CategoriesSlider/>
  <Products/>
  </>
  )
}
