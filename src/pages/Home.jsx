import React, { useEffect } from 'react'
import Banner from "../components/home/Banner"
import Categories from "../components/home/Categories"
import Footer from "../components/general/Footer"
import Hero from "../components/home/Hero"
import Navbar from "../components/general/Navbar"
import News from "../components/home/News"
import Products from "../components/home/Products"
import Testimonials from "../components/home/Testimonials"
import { useToast } from '../context/ToastContext'
import { useLocation } from 'react-router-dom'

const Home = () => {
   const { showToast } = useToast();
  
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");
    const reference = queryParams.get("reference");


      useEffect(() => {
    if (status === "success") {
      showToast("Wallet funded successfully", "success");

    } else if (status === "failed") {
      alert(" Payment failed. Please try again.");
      showToast("Wallet funding failed", "error");

    }
  }, [status, reference, showToast]);
  return (
    <>
        <Hero/>
        <Categories/>
        <Products/>
        {/* <Banner/> */}
        <Testimonials/>
        <News/>
    </>
  )
}

export default Home