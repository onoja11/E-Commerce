import React from 'react'

const Stats = () => {
  return (
 <div className="bg-black rounded-3xl p-12 text-white"> 
            <div className="grid md:grid-cols-4 gap-8 text-center"> 
                <div>
                    <div className="text-4xl font-bold mb-2">50K+</div> 
                    <div className="text-gray-300">Happy Customers</div>    
                </div>
                <div>
                    <div className="text-4xl font-bold mb-2">200+</div> 
                    <div className="text-gray-300">Unique Designs</div> 
                </div>
                <div>
                    <div className="text-4xl font-bold mb-2">5</div>    
                    <div className="text-gray-300">Years of Excellence</div>    
                </div>
                <div>
                    <div className="text-4xl font-bold mb-2">98%</div>  
                    <div className="text-gray-300">Satisfaction Rate</div>  
                </div>
            </div>
        </div>  )
}

export default Stats