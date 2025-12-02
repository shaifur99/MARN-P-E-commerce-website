import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayBDTCurrency from '../helpers/displayCurrency'

const AllOrder = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchOrderDetails = async () => {
        try {
            const response = await fetch(SummaryApi.allOrder.url, {
                method: SummaryApi.allOrder.method,
                credentials: 'include'
            })

            const responseData = await response.json()
            console.log("Order list response:", responseData)

            if (responseData.success) {
                setData(responseData.data || [])
            } else {
                console.error("Failed to fetch orders:", responseData.message)
                setData([])
            }
        } catch (error) {
            console.error("Error fetching orders:", error)
            setData([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrderDetails()
    }, [])

    if (loading) {
        return (
            <div className='flex justify-center items-center h-[calc(100vh-190px)]'>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        )
    }

    return (
        <div className='h-[calc(100vh-190px)] overflow-y-auto p-4'>
            {
                data.length === 0 ? (
                    <div className='flex justify-center items-center h-full'>
                        <p className='text-gray-500 text-lg'>No orders available</p>
                    </div>
                ) : (
                    <div className='space-y-6'>
                        {
                            data.map((item, index) => {
                                // Safely handle all properties
                                const productDetails = item?.productDetails || []
                                const paymentDetails = item?.paymentDetails || {}
                                const shippingDetails = item?.shippingDetails || {}
                                
                                return (
                                    <div key={item._id || index} className='bg-white border rounded-lg shadow-sm p-4'>
                                        {/* Order Header */}
                                        <div className='flex justify-between items-start mb-4 pb-3 border-b'>
                                            <div>
                                                <p className='font-medium text-lg'>
                                                    {moment(item.createdAt).format('LL')}
                                                </p>
                                                <p className='text-sm text-gray-500'>
                                                    Transaction ID: {item.transactionId}
                                                </p>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                item.status === 'Failed' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {item.status}
                                            </div>
                                        </div>

                                        {/* Order Content */}
                                        <div className='flex flex-col lg:flex-row gap-6'>
                                            {/* Products Section */}
                                            <div className='flex-1'>
                                                <h3 className='font-medium text-lg mb-3'>Products</h3>
                                                <div className='space-y-3'>
                                                    {
                                                        productDetails.length > 0 ? (
                                                            productDetails.map((product, productIndex) => (
                                                                <div key={productIndex} className='flex gap-4 p-3 bg-gray-50 rounded-lg'>
                                                                    <div className='w-24 h-24 bg-white border rounded flex-shrink-0'>
                                                                        <img
                                                                            src={product?.image?.[0] || '/placeholder.jpg'}
                                                                            className='w-full h-full object-contain p-2'
                                                                            alt={product?.name}
                                                                            onError={(e) => {
                                                                                e.target.src = '/placeholder.jpg'
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div className='flex-1'>
                                                                        <div className='font-medium text-lg line-clamp-1'>
                                                                            {product?.name || 'Unknown Product'}
                                                                        </div>
                                                                        <div className='flex items-center gap-5 mt-2'>
                                                                            <div className='text-lg font-semibold text-red-600'>
                                                                                {displayBDTCurrency(product?.price || 0)}
                                                                            </div>
                                                                            <p className='text-gray-600'>
                                                                                Quantity: {product?.quantity || 0}
                                                                            </p>
                                                                        </div>
                                                                        <div className='mt-1 text-gray-500 text-sm'>
                                                                            Subtotal: {displayBDTCurrency((product?.price || 0) * (product?.quantity || 0))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p className='text-gray-500 text-center py-4'>No product details available</p>
                                                        )
                                                    }
                                                </div>
                                            </div>

                                            {/* Payment & Shipping Details */}
                                            <div className='lg:w-80 space-y-4'>
                                                {/* Payment Details */}
                                                <div className='bg-gray-50 rounded-lg p-4'>
                                                    <h3 className='font-medium text-lg mb-2'>Payment Details</h3>
                                                    <div className='space-y-2'>
                                                        <div className='flex justify-between'>
                                                            <span className='text-gray-600'>Method:</span>
                                                            <span className='font-medium'>
                                                                {paymentDetails.payment_method_type?.[0] || 'SSLCommerz'}
                                                            </span>
                                                        </div>
                                                        <div className='flex justify-between'>
                                                            <span className='text-gray-600'>Status:</span>
                                                            <span className={`font-medium ${
                                                                paymentDetails.payment_status === 'Completed' ? 'text-green-600' :
                                                                paymentDetails.payment_status === 'Pending' ? 'text-yellow-600' :
                                                                'text-red-600'
                                                            }`}>
                                                                {paymentDetails.payment_status || 'Unknown'}
                                                            </span>
                                                        </div>
                                                        <div className='flex justify-between'>
                                                            <span className='text-gray-600'>Transaction:</span>
                                                            <span className='font-medium text-sm truncate max-w-[150px]'>
                                                                {item.transactionId}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Shipping Details */}
                                                <div className='bg-gray-50 rounded-lg p-4'>
                                                    <h3 className='font-medium text-lg mb-2'>Shipping Details</h3>
                                                    <div className='space-y-2'>
                                                        <div className='flex justify-between'>
                                                            <span className='text-gray-600'>Name:</span>
                                                            <span className='font-medium'>{shippingDetails.name || 'N/A'}</span>
                                                        </div>
                                                        <div className='flex justify-between'>
                                                            <span className='text-gray-600'>Email:</span>
                                                            <span className='font-medium'>{shippingDetails.email || 'N/A'}</span>
                                                        </div>
                                                        <div className='flex justify-between'>
                                                            <span className='text-gray-600'>Phone:</span>
                                                            <span className='font-medium'>{shippingDetails.phone || 'N/A'}</span>
                                                        </div>
                                                        <div className='flex justify-between'>
                                                            <span className='text-gray-600'>Address:</span>
                                                            <span className='font-medium text-right'>{shippingDetails.address || 'N/A'}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Order Summary */}
                                                <div className='bg-gray-50 rounded-lg p-4'>
                                                    <h3 className='font-medium text-lg mb-2'>Order Summary</h3>
                                                    <div className='space-y-2'>
                                                        <div className='flex justify-between'>
                                                            <span className='text-gray-600'>Order Status:</span>
                                                            <span className={`font-medium ${
                                                                item.status === 'Completed' ? 'text-green-600' :
                                                                item.status === 'Pending' ? 'text-yellow-600' :
                                                                item.status === 'Failed' ? 'text-red-600' :
                                                                'text-gray-600'
                                                            }`}>
                                                                {item.status}
                                                            </span>
                                                        </div>
                                                        <div className='flex justify-between'>
                                                            <span className='text-gray-600'>Items:</span>
                                                            <span className='font-medium'>
                                                                {productDetails.reduce((total, product) => total + (product?.quantity || 0), 0)}
                                                            </span>
                                                        </div>
                                                        <div className='flex justify-between border-t pt-2'>
                                                            <span className='text-lg font-semibold'>Total Amount:</span>
                                                            <span className='text-lg font-bold text-green-600'>
                                                                {displayBDTCurrency(item.totalAmount || 0)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default AllOrder