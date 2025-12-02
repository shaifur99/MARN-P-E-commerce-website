import React, { useContext, useEffect, useRef, useState, useCallback } from 'react'   // Importing React functions
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct' // Fetch products by category
import displayINRCurrency from '../helpers/displayCurrency'               // Function to format INR currency
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'               // Left & right icons
import { Link } from 'react-router-dom'                                   // For navigating pages
import addToCart from '../helpers/addToCart'                              // Add-to-cart helper
import Context from '../context'                                          // Global context

const VerticalCardProduct = ({category, heading}) => {   // Component receives category & heading
    const [data,setData] = useState([])                  // Store product list
    const [loading,setLoading] = useState(true)          // Loading state
    const loadingList = new Array(13).fill(null)         // Fake loading skeleton list

    const scrollElement = useRef()                       // Ref to control horizontal scroll

    const { fetchUserAddToCart } = useContext(Context)   // Get function from global context

    const handleAddToCart = async(e,id)=>{               // Function runs when user clicks Add to Cart
       await addToCart(e,id)                             // Adds product to cart
       fetchUserAddToCart()                              // Refresh user cart instantly
    }

    const fetchData = useCallback(async() =>{            // Wrap in useCallback to prevent recreating on every render
        setLoading(true)                                 // Start loading
        const categoryProduct = await fetchCategoryWiseProduct(category) // Get category items
        setLoading(false)                                // Stop loading

        setData(categoryProduct?.data)                   // Store products in state
    }, [category])                                       // Dependency: fetchData recreates when category changes

    useEffect(()=>{                                      // Run fetchData only when category changes
        fetchData()
    },[fetchData])                                       // Now fetchData is stable due to useCallback

    const scrollRight = () =>{                           // Scroll right by 300px
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () =>{                            // Scroll left by 300px
        scrollElement.current.scrollLeft -= 300
    }

  return (
    <div className='container mx-auto px-4 my-6 relative'>  {/* Page container */}

            {/* Fix: Added explicit content and screen reader accessibility */}
            <h2 className='text-2xl font-semibold py-4'>
                {heading || 'Products'}  {/* Fallback text if heading is empty */}
            </h2>

           <div 
             className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' 
             ref={scrollElement}
            >
            {/* Scroll left button */}
            <button  
              className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' 
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
                <FaAngleLeft/>
            </button>

            {/* Scroll right button */}
            <button  
              className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' 
              onClick={scrollRight}
              aria-label="Scroll right"
            >
                <FaAngleRight/>
            </button> 

           {
                loading ? (   // When loading is true, show skeleton cards
                    loadingList.map((_,index)=>{
                        return(
                            <div 
                              key={index}
                              className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow '
                            >
                                <div className='bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse'>
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-medium text-base md:text-lg animate-pulse bg-slate-200 rounded-full h-6'></h2>
                                    <p className='animate-pulse bg-slate-200 rounded-full h-5'></p>
                                    <div className='flex gap-3'>
                                        <p className='animate-pulse bg-slate-200 rounded-full w-full h-5'></p>
                                        <p className='animate-pulse bg-slate-200 rounded-full w-full h-5'></p>
                                    </div>
                                    <button className='animate-pulse bg-slate-200 rounded-full h-8'></button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data.map((product,index)=>{
                        return(
                            <Link 
                              key={product?._id}
                              to={"product/"+product?._id}
                              className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow '
                            >
                                <div className='bg-slate-200 h-48 p-4 flex justify-center items-center'>
                                    
                                    {/* Fix: Missing ALT added */}
                                    <img 
                                      src={product.productImage[0]} 
                                      alt={product?.productName || "product image"} 
                                      className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'
                                    />
                                </div>

                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-medium text-base md:text-lg line-clamp-1'>
                                        {product?.productName}
                                    </h2>

                                    <p className='capitalize text-slate-500'>{product?.category}</p>

                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium'>
                                            { displayINRCurrency(product?.sellingPrice) }
                                        </p>

                                        <p className='text-slate-500 line-through'>
                                            { displayINRCurrency(product?.price) }
                                        </p>
                                    </div>

                                    <button 
                                      className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full'
                                      onClick={(e)=>handleAddToCart(e,product?._id)}
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
    </div>
  )
}

export default VerticalCardProduct