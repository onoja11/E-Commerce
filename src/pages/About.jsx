import React from 'react'
import Navbar from '../components/general/Navbar'
import Hero from '../components/general/Hero'
import Story from '../components/about/story'
import Values from '../components/about/Values'
import Stats from '../components/about/Stats'

const About = () => {
  return (
    <>
    <Hero heading={'About koveCaps'} description={`Crafting premium headwear that defines your style and speaks to your personality.Every cap tells a story, and we're here to help you tell yours.`} styles={'bg-gradient-to-br from-gray-900 via-gray-800 to-black' }/>
    <Story/>
   
    </>
  )
}

export default About