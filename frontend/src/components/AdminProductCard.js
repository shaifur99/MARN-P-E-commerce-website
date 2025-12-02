import React, { useState } from 'react' // Import React and useState hook
import { MdModeEditOutline } from "react-icons/md"; // Import edit icon
import AdminEditProduct from './AdminEditProduct'; // Import modal component to edit product
import displayBDTCurrency from '../helpers/displayCurrency'; // Helper to display price in BDT format

const AdminProductCard = ({
    data,      // Product data passed from parent
    fetchdata  // Function to refresh product list after update
}) => {
    // State to control showing/hiding the edit product modal
    const [editProduct,setEditProduct] = useState(false)

    return (
        <div className='bg-white p-4 rounded shadow-md border border-transparent hover:border-black hover:shadow-sm transition-all duration-300 '>
            {/* Product image section */}
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center '>
                    {/* Add alt text for accessibility */}
                    <img 
                        src={data?.productImage[0]}  
                        alt={data.productName} 
                        className='mx-auto object-fill h-full'
                    />   
                </div> 
                {/* Product name */}
                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

                <div>
                    {/* Product selling price in Bangladesh  format */}
                    <p className='font-semibold'>
                        { displayBDTCurrency(data.sellingPrice) }
                    </p>

                    {/* Edit button */}
                    <div 
                        className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' 
                        onClick={()=>setEditProduct(true)} // Open edit modal on click
                    >
                        <MdModeEditOutline/>
                    </div>
                </div>
            </div>
            
            {/* Show AdminEditProduct modal if editProduct is true */}
            { editProduct && (
                <AdminEditProduct 
                    productData={data}            // Pass current product data
                    onClose={()=>setEditProduct(false)} // Function to close modal
                    fetchdata={fetchdata}         // Refresh product list after update
                />
            )}
        </div>
    )
}

export default AdminProductCard
