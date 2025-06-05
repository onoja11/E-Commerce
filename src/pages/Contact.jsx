import React from 'react'
import Hero from '../components/general/Hero'
import MainContent from '../components/contact/MainContent'

const Contact = () => {
  return (
    <>
      <Hero heading={'Get In Touch'} description={`Have questions about our caps? Need custom designs? Want to collaborate? We'd love to hear from you and help bring your vision to life.`} styles={'bg-gradient-to-br from-gray-900 via-gray-800 to-black '}/>
      <MainContent/>
    </>
  )
}

export default Contact