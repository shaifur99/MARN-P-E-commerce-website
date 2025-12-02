// Import required React hooks and modules
import React, { useContext, useEffect, useRef, useState } from 'react'

// Import helper function to fetch products based on category
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'

// Import helper to show BDT currency in right format
import displayBDTCurrency from '../helpers/displayCurrency'

// Import icons for scroll arrows
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

// Import Link for navigation to product details page
import { Link } from 'react-router-dom'

// Import helper to add product to cart
import addToCart from '../helpers/addToCart'

// Import global context
import Context from '../context'

// Component receives category and heading as props
const HorizontalCardProduct = ({ category, heading }) => {

  // State to store products
  const [data, setData] = useState([])

  // State to show loading skeleton
  const [loading, setLoading] = useState(true)

  // Show left arrow or not
  const [showLeftArrow, setShowLeftArrow] = useState(false)

  // Show right arrow or not
  const [showRightArrow, setShowRightArrow] = useState(true)

  // Create loading skeleton list
  const loadingList = new Array(13).fill(null)

  // Reference for horizontal scroll element
  const scrollElement = useRef()

  // Get method from context to refresh cart
  const { fetchUserAddToCart } = useContext(Context)

  // Handle Add to Cart button
  const handleAddToCart = async (e, id) => {
    e.preventDefault() // Prevent page reload
    await addToCart(e, id) // Add item to cart
    fetchUserAddToCart() // Refresh cart data
  }

  // Fetch category-wise product data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true) // Start loading
      const categoryProduct = await fetchCategoryWiseProduct(category) // Fetch products
      setLoading(false) // Stop loading
      setData(categoryProduct?.data || []) // Save products in state
    }
    fetchData() // Run fetch
  }, [category]) // Run when category changes

  // Check scroll position for arrow visibility
  const checkScrollPosition = () => {
    if (scrollElement.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollElement.current

      // Show left arrow if not at the start
      setShowLeftArrow(scrollLeft > 0)

      // Show right arrow if not at the end
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  // Scroll to the right side
  const scrollRight = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollBy({ left: 300, behavior: 'smooth' })
      setTimeout(checkScrollPosition, 300) // Update arrow visibility
    }
  }

  // Scroll to the left side
  const scrollLeft = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollBy({ left: -300, behavior: 'smooth' })
      setTimeout(checkScrollPosition, 300)
    }
  }

  // Check scroll after data load and when loading ends
  useEffect(() => {
    checkScrollPosition()
  }, [loading, data])

  return (
    <div className='container mx-auto px-4 my-6'>
      
      {/* Show heading if provided */}
      {heading && (
        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
      )}

      {/* Relative wrapper to place arrows */}
      <div className='relative'>

        {/* Left scroll arrow */}
        {showLeftArrow && (
          <button
            className='bg-white shadow-lg rounded-full p-3 absolute left-0 top-1/2 transform -translate-y-1/2 z-10 hover:bg-gray-100 transition-all duration-200 border border-gray-200'
            onClick={scrollLeft}
            aria-label='Scroll left'
          >
            <FaAngleLeft className='text-lg text-gray-700' />
          </button>
        )}

        {/* Right scroll arrow */}
        {showRightArrow && (
          <button
            className='bg-white shadow-lg rounded-full p-3 absolute right-0 top-1/2 transform -translate-y-1/2 z-10 hover:bg-gray-100 transition-all duration-200 border border-gray-200'
            onClick={scrollRight}
            aria-label='Scroll right'
          >
            <FaAngleRight className='text-lg text-gray-700' />
          </button>
        )}

        {/* Product scroll container */}
        <div
          className='flex items-center gap-4 md:gap-6 overflow-x-auto scrollbar-none px-2 py-4'
          ref={scrollElement} // Attach scroll reference
          onScroll={checkScrollPosition} // Check scroll on movement
          style={{ scrollBehavior: 'smooth' }}
        >

          {/* Show loading skeleton while data loads */}
          {loading ? (
            loadingList.map((_, index) => (
              <div
                key={index}
                className='flex-shrink-0 w-[280px] md:w-[320px] h-36 bg-white rounded-lg shadow flex'
              >
                {/* Loading image placeholder */}
                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse rounded-l-lg'></div>

                {/* Loading text placeholder */}
                <div className='p-4 grid w-full gap-2'>
                  <div className='font-medium text-base md:text-lg text-black bg-slate-200 animate-pulse p-1 rounded-full h-6'></div>
                  <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full h-4'></p>

                  <div className='flex gap-3 w-full'>
                    <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full h-4'></p>
                    <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full h-4'></p>
                  </div>

                  <button className='text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse h-6'></button>
                </div>
              </div>
            ))
          ) : (

            /* Show product cards after loading */
            data.map((product) => (
              <Link
                key={product?._id}
                to={"product/" + product?._id} // Navigate to product details
                className='flex-shrink-0 w-[280px] md:w-[320px] h-36 bg-white rounded-lg shadow flex hover:shadow-lg transition-shadow duration-200'
              >
                {/* Product Image */}
                <div className='bg-slate-100 h-full p-4 min-w-[120px] md:min-w-[145px] flex items-center justify-center rounded-l-lg'>
                  <img
                    src={product.productImage[0]}
                    alt={product?.productName || 'Product Image'}
                    className='object-scale-down h-full max-w-full hover:scale-105 transition-transform duration-200'
                  />
                </div>

                {/* Product Text Details */}
                <div className='p-4 grid flex-1'>
                  <h3 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>
                    {product?.productName || 'Product Name'}
                  </h3>

                  <p className='capitalize text-slate-500 text-sm'>{product?.category}</p>

                  {/* Product price section */}
                  <div className='flex gap-3 mt-1'>
                    <p className='text-red-600 font-medium text-sm'>
                      {displayBDTCurrency(product?.sellingPrice)}
                    </p>
                    <p className='text-slate-500 line-through text-sm'>
                      {displayBDTCurrency(product?.price)}
                    </p>
                  </div>

                  {/* Add to cart button */}
                  <button
                    className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full mt-2 transition-colors duration-200'
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))
          )}

        </div>
      </div>
    </div>
  )
}

export default HorizontalCardProduct
