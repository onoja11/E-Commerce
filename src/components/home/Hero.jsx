import React from 'react';
    import heroImg from '../../assets/IMG-20250526-WA0022-removebg-preview.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
      <div className="relative bg-white overflow-hidden pt-10 md:pt-0">
        <div className="max-w-7xl mx-auto">
            <div className="relative z-10  sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                    <div className="sm:text-center lg:text-left">
                        <h1 className="fade-in  text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-5xl xl:text-6xl">
                            <span className="block pt-9" >Redefine Your Style</span>
                            <span className="block text-slate-800">With koveCaps</span>
                        </h1>
                        <p className="fade-in mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                            Discover our collection of handcrafted caps designed for comfort, style, and durability.
                        </p>
                        <div className="fade-in mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                            <div className="rounded-md shadow">
                                <Link to={"/caps"} className="w-full flex items-center justify-center px-9 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-white hover:border-1 hover:border-black hover:text-black  transition duration-300 md:py-4 md:text-lg md:px-10">
                                    Shop Now
                                </Link>
                            </div>
                            <div className="mt-3 sm:mt-0 sm:ml-3">
                                <Link to={"/caps"} className="w-full flex items-center justify-center px-9 py-3 border-1 border-black text-base font-medium rounded-md text-black  hover:bg-black hover:text-white transition duration-300 md:py-4 md:text-lg md:px-10">
                                    Collections
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        <div className="lg:absolute p-5 md:pt-16 lg:inset-y-0 lg:right-0 lg:w-1/2 ">
            <img className="h-56 w-full object-cover sm:h-72 md:h-105 lg:w-full lg:h-full hero-img invert" src={heroImg} alt="Cap collection"/>
        </div>
    </div>
  )
}

export default Hero