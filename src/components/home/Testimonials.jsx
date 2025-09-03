import React, { useEffect, useState } from 'react'
import Testimonial from './Testimonial'
import pic1 from '../../assets/pexels-cottonbro-5119522.jpg'
import pic2 from '../../assets/pexels-dzeninalukac-1376049.jpg'
import pic3 from '../../assets/pexels-enginakyurt-1642228.jpg'
import axios from '../../api/axios'

const Testimonials = () => {
  const [reviews, setReviews] = useState([])
  const [showAll, setShowAll] = useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch reviews from API
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/reviews')
        setReviews(response.data)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }
    fetchReviews()
  }, [])

  // Decide which reviews to display
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3)

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl fade-in">
            What Our Customers Say
          </h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3 md:grid-cols-2">
          {loading ? (
            <p className=''>Loading reviews...</p>
          ) :
          reviews.length > 0 ? (
            displayedReviews.map((review) => (
              <Testimonial
                key={review.id}
                name={review.user.name || 'Anonymous'}
                ratings={review.rating}
                review={
                  review.comment.length > 100
                    ? review.comment.substring(0, 100) + '...'
                    : review.comment
                }
                pic={pic1} // You can replace this with dynamic images if available
              />
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">
              No reviews available.
            </p>
          )}
        </div>

        {/* Show button only if more than 3 reviews */}
        {reviews.length > 3 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm font-medium text-black border border-black rounded-md px-4 py-2 hover:bg-black hover:text-white transition-colors"
            >
              {showAll
                ? 'Show Less'
                : `See All ${reviews.length} Reviews`}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Testimonials
