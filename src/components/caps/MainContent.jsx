import React from 'react'
import Product from '../general/Product'
import Filter from './Filter'

const MainContent = () => {
  return (
<section id="collection" className="py-20 px-6 ">
        <div className="max-w-7xl mx-auto ">
            {/* <!-- Section Header --> */}
            <div className="text-center mb-16 pt-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Our Collection
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Each cap is carefully selected to represent style, comfort, and quality
                </p>
            </div>

            {/* <!-- Category Filters --> */}
           <Filter/>

            {/* <!-- Caps Grid --> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:px-5 gap-8">
                {/* <!-- Cap Card 1 --> */}
                <Product name={'ClassNameic Baseball Cap'} description={'Premium cotton blend with adjustable strap'} pic={'/pexels-cottonbro-5119522.jpg'} price={'$29.99'}/>
                <Product name={'Urban Snapback'} description={'Street-style design with flat brim'} pic={'/pexels-dzeninalukac-1376049.jpg'} price={'$34.99'}/>
                <Product name={'ClassNameic Baseball Cap'} description={'Premium cotton blend with adjustable strap'} pic={'/pexels-cottonbro-5119522.jpg'} price={'$29.99'}/>
                <Product name={'Urban Snapback'} description={'Street-style design with flat brim'} pic={'/pexels-dzeninalukac-1376049.jpg'} price={'$34.99'}/>
                <Product name={'ClassNameic Baseball Cap'} description={'Premium cotton blend with adjustable strap'} pic={'/pexels-cottonbro-5119522.jpg'} price={'$29.99'}/>
                <Product name={'Urban Snapback'} description={'Street-style design with flat brim'} pic={'/pexels-dzeninalukac-1376049.jpg'} price={'$34.99'}/>
                <Product name={'ClassNameic Baseball Cap'} description={'Premium cotton blend with adjustable strap'} pic={'/pexels-cottonbro-5119522.jpg'} price={'$29.99'}/>
                <Product name={'Urban Snapback'} description={'Street-style design with flat brim'} pic={'/pexels-dzeninalukac-1376049.jpg'} price={'$34.99'}/>
                {/* <!-- Cap Card 2 --> */}
                            {/* <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg> */}
               
            </div>
        </div>
    </section>  )
}

export default MainContent