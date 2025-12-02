import React, { useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'

/**
 * CategoryWiseProductDisplay Component
 * Displays a horizontal scrollable list of products for a specific category
 * @param {string} category - The category of products to display
 * @param {string} heading - The heading/title for the product section
 */
const CategroyWiseProductDisplay = ({ category, heading }) => {
    const [data, setData] = useState([]) // Store product data
    const [loading, setLoading] = useState(true) // Loading state
    const loadingList = new Array(13).fill(null) // Skeleton array

    const { fetchUserAddToCart } = useContext(Context) // Cart context

    // Add product to cart
    const handleAddToCart = async (e, id) => {
        e.preventDefault()
        await addToCart(e, id)
        fetchUserAddToCart() // Refresh cart
    }

    // Fetch category-wise products
    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        console.log("horizontal data", categoryProduct.data)
        setData(categoryProduct?.data)
    }

    // Fetch data on component mount or category change
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])

    return (
        <div className='container mx-auto px-4 my-6 relative'>

            {/* Section Heading */}
            <h2 className='text-2xl font-semibold py-4'>{heading || 'Products'}</h2>

            {/* Product Grid/List */}
            <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
                {loading ? (
                    // Loading Skeleton
                    loadingList.map((product, index) => (
                        <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                            {/* Product Image Skeleton */}
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'></div>
                            
                            {/* Product Details Skeleton */}
                            <div className='p-4 grid gap-3'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'>
                                    <span className="sr-only">Loading product name</span>
                                </h2>
                                <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2'>
                                    <span className="sr-only">Loading category</span>
                                </p>
                                <div className='flex gap-3'>
                                    <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'>
                                        <span className="sr-only">Loading selling price</span>
                                    </p>
                                    <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'>
                                        <span className="sr-only">Loading original price</span>
                                    </p>
                                </div>
                                <button className='text-sm text-white px-3 rounded-full bg-slate-200 py-2 animate-pulse'>
                                    <span className="sr-only">Loading Add to Cart button</span>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    // Actual Product Data
                    data.map((product) => (
                        <Link 
                            key={product._id} 
                            to={"/product/" + product?._id} 
                            className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow' 
                            onClick={scrollTop}
                        >
                            {/* Product Image */}
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                <img 
                                    src={product.productImage[0]} 
                                    className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' 
                                    alt={product?.productName} 
                                />
                            </div>
                            {/* Product Details */}
                            <div className='p-4 grid gap-3'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>
                                    {product?.productName}
                                </h2>
                                <p className='capitalize text-slate-500'>{product?.category}</p>
                                <div className='flex gap-3'>
                                    {/* Selling Price */}
                                    <p className='text-red-600 font-medium'>
                                        {displayINRCurrency(product?.sellingPrice)}
                                    </p>
                                    {/* Original Price (Strikethrough) */}
                                    <p className='text-slate-500 line-through'>
                                        {displayINRCurrency(product?.price)}
                                    </p>
                                </div>
                                {/* Add to Cart Button */}
                                <button 
                                    className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full'
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
    )
}

export default CategroyWiseProductDisplay
