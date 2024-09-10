import React from 'react'
import style from './Layout.module.css'
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';
Outlet

export default function Layout() {
  return (
    <>
    <Navbar/>
    <div className=" mx-auto p-8 mt-3"> <Outlet/></div>
    <Footer/>
    </>
  )
}
