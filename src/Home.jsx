import React from 'react'
import Banner from "./components/home/Banner"
import Categories from "./components/home/Categories"
import Footer from "./components/general/Footer"
import Hero from "./components/home/Hero"
import Navbar from "./components/general/Navbar"
import News from "./components/home/News"
import Products from "./components/home/Products"
import Testimonials from "./components/home/Testimonials"

const Home = () => {
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