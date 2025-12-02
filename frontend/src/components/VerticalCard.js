import React, { useContext } from 'react'              // Importing React and useContext hook
import scrollTop from '../helpers/scrollTop'           // Function to scroll page to top on click
import displayINRCurrency from '../helpers/displayCurrency' // Helper to format money
import Context from '../context'                       // Importing global context
import addToCart from '../helpers/addToCart'           // Function to add product to cart
import { Link } from 'react-router-dom'                // Used for navigation without page reload

const VerticalCard = ({ loading, data = [] }) => {     // Component receives loading state and product data
    const loadingList = new Array(13).fill(null)       // Create skeleton list for loading animation
    const { fetchUserAddToCart } = useContext(Context) // Access context function to refresh cart count

    // Function to handle Add To Cart button click
    const handleAddToCart = async (e, id) => {
       await addToCart(e, id)                          // Add product to cart
       fetchUserAddToCart()                            // Refresh cart UI data
    }

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all'>
    {
        // If loading = true → show skeleton UI
        loading ? (
            loadingList.map((product, index) => {
                return (
                    <div 
                        key={index} 
                        className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'
                    >
                        {/* Image skeleton box */}
                        <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                        </div>

                        {/* Text skeleton box */}
                        <div className='p-4 grid gap-3'>
                            {/* Empty heading but hidden for screen reader to avoid ESLint warning */}
                            <h2 
                                aria-hidden="true" 
                                className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'
                            ></h2>

                            <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>

                            {/* Price skeleton */}
                            <div className='flex gap-3'>
                                <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                            </div>

                            {/* Button skeleton */}
                            <button className='text-sm text-white px-3 rounded-full bg-slate-200 py-2 animate-pulse'></button>
                        </div>
                    </div>
                )
            })
        ) : (
            // If loading = false → show real product data
            data.map((product, index) => {
                return (
                    <Link
                        key={product?._id || index}                // Unique key to avoid React warnings
                        to={"/product/" + product?._id}           // Clicking opens product details page
                        className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow'
                        onClick={scrollTop}                       // Scroll page to top
                    >
                        <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                            {/* Main product image */}
                            <img 
                                src={product?.productImage[0]}     // First image from product array
                                alt={product?.productName}         // FIXED → Added alt attribute
                                className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'
                            />
                        </div>

                        {/* Product details section */}
                        <div className='p-4 grid gap-3'>
                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>
                                {product?.productName}             
                            </h2>

                            <p className='capitalize text-slate-500'>
                                {product?.category}               
                            </p>

                            {/* Price and previous price */}
                            <div className='flex gap-3'>
                                <p className='text-red-600 font-medium'>
                                    {displayINRCurrency(product?.sellingPrice)}  
                                </p>
                                <p className='text-slate-500 line-through'>
                                    {displayINRCurrency(product?.price)}         
                                </p>
                            </div>

                            {/* Add to cart button */}
                            <button 
                                className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full'
                                onClick={(e) => handleAddToCart(e, product?._id)}   // Event handler
                            >
                                Add to Cart
                            </button>
                        </div>
                    </Link>
                )
            })
        )
     }
    </div>
  )
}

export default VerticalCard
