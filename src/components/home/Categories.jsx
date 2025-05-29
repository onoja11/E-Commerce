import React from 'react'
import pic1 from '../../assets/pexels-cottonbro-5119522.jpg'
import pic2 from '../../assets/pexels-dzeninalukac-1376049.jpg'
import pic3 from '../../assets/pexels-enginakyurt-1642228.jpg'
import Category from './Category'

const Categories = () => {
  return (
      <div className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl fade-in">
                    Shop By Category
                </h2>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto fade-in">
                    Find the perfect cap for any occasion.
                </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Category category={'Sports Collection'} pic={pic1} description={'Designed for performance and style.'}/>
                <Category category={'Fashion Statements'} pic={pic2} description={'Elevate your everyday look.'}/>
                <Category category={'Limited Editions'} pic={pic3} description={'Unique designs, limited quantities.'}/>        
            </div>
        </div>
    </div>
  )
}

export default Categories