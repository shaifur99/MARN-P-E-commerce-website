// Import React and hooks useEffect, useState
import React, { useEffect, useState } from 'react'

// Import API URL or configuration from common file
import SummaryApi from '../common'

// Import Link component from react-router-dom for page navigation
import { Link } from 'react-router-dom'

// Functional component for displaying category list
const CategoryList = () => {
    // State to store fetched category products
    const [categoryProduct,setCategoryProduct] = useState([])

    // State to indicate loading while fetching data
    const [loading,setLoading] = useState(false)

    // Array to show loading placeholders (13 empty items)
    const categoryLoading = new Array(13).fill(null)

    // Function to fetch category products from API
    const fetchCategoryProduct = async() =>{
        setLoading(true) // Start loading
        const response = await fetch(SummaryApi.categoryProduct.url) // Fetch data from API
        const dataResponse = await response.json() // Parse JSON response
        setLoading(false) // Stop loading
        setCategoryProduct(dataResponse.data) // Save fetched data in state
    }

    // useEffect to fetch category products when component mounts
    useEffect(()=>{
        fetchCategoryProduct()
    },[])

    // Render JSX
    return (
        <div className='container mx-auto p-4'> {/* Main container with padding */}
           <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'> {/* Flex container for horizontal scroll */}
            {
                // If loading, show placeholder skeletons
                loading ? (
                    categoryLoading.map((el,index)=>{
                            return(
                                <div 
                                    className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' 
                                    key={"categoryLoading"+index} // Unique key for each placeholder
                                >
                                </div>
                            )
                    })  
                ) :
                (
                    // If not loading, show category products
                    categoryProduct.map((product,index)=>{
                        return(
                            <Link 
                                to={"/product-category?category="+product?.category} // Link to category page
                                className='cursor-pointer' 
                                key={product?.category} // Unique key for each product
                            >
                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                    {/* Product image with hover effect */}
                                    <img 
                                        src={product?.productImage[0]} 
                                        alt={product?.category} 
                                        className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'
                                    />
                                </div>
                                {/* Display category name */}
                                <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                            </Link>
                        )
                    })
                )
            }
           </div>
        </div>
    )
}

// Export component to use in other parts of the app
export default CategoryList
