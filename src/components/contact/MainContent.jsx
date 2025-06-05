import React from 'react'
import ContactForm from './ContactForm'
import Info from './Info'

const MainContent = () => {
  return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* <!-- Contact Form & Info --> */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
           <ContactForm/>
           <Info/>           
        </div>

    
    </div>  )
}

export default MainContent