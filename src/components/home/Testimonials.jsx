import React from 'react'
import Testimonial from './Testimonial'
import pic1 from '../../assets/pexels-cottonbro-5119522.jpg'
import pic2 from '../../assets/pexels-dzeninalukac-1376049.jpg'
import pic3 from '../../assets/pexels-enginakyurt-1642228.jpg'

const Testimonials = () => {
  return (
 <div className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl fade-in">
                    What Our Customers Say
                </h2>
            </div>
            <div className="mt-12 grid gap-8 lg:grid-cols-3 md:grid-cols-2">
                <Testimonial name={'Alex Morgan'} review={"These caps are incredible! The quality and comfort are unmatched. I've gotten so many compliments wearing mine."} pic={pic1}/>
                <Testimonial name={'Jamie Lewis'} review={"Perfect fit and great material. The designs are unique and I love how they stand out from regular caps. Will definitely buy more."} pic={pic2}/>
                <Testimonial name={'Sam Thompson'} review={"Fast shipping and exactly as described. These caps are so comfortable I sometimes forget I'm wearing them. The customer service was excellent too!"} pic={pic3}/>
            </div>
        </div>
    </div>  )
}

export default Testimonials