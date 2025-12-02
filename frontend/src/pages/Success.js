import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import SUCCESSIMAGE from '../assest/success.gif'
import displayBDTCurrency from '../helpers/displayCurrency'
import SummaryApi from '../common'
import { toast } from 'react-toastify'

const Success = () => {
    const [searchParams] = useSearchParams()
    const [orderData, setOrderData] = useState(null)
    const [loading, setLoading] = useState(true)
    const transactionId = searchParams.get('transactionId')

    const fetchOrderDetails = async () => {
        try {
            const response = await fetch(SummaryApi.getOrder.url, {
                method: 'GET',
                credentials: 'include'
            })
            
            const responseData = await response.json()
            
            if (responseData.success) {
                // Find the specific order by transactionId
                const order = responseData.data.find(order => order.transactionId === transactionId)
                if (order) {
                    setOrderData(order)
                } else {
                    toast.warning("Order details not found yet")
                }
            }
        } catch (error) {
            console.error("Error fetching order details:", error)
            toast.error("Failed to load order details")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (transactionId) {
            fetchOrderDetails()
        } else {
            setLoading(false)
        }
    }, [transactionId])

    if (loading) {
        return (
            <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
                <div className='text-center'>
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
                    <p className='mt-4 text-gray-600'>Loading order details...</p>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
            <div className='bg-white w-full max-w-2xl mx-auto flex flex-col p-6 m-4 rounded-lg shadow-lg border border-green-200'>
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={SUCCESSIMAGE}
                        width={120}
                        height={120}
                        alt="Payment Successful"
                        className="mb-4"
                    />
                    <p className='text-green-600 font-bold text-2xl mb-2'>Payment Successful!</p>
                    <p className="text-gray-600 text-center mb-4">
                        Thank you for your purchase. Your order has been confirmed.
                    </p>
                </div>

                {orderData && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-lg mb-3 text-gray-800">Order Summary</h3>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                                <p className="text-sm text-gray-600">Order ID</p>
                                <p className="font-semibold">{orderData.transactionId}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Payment Status</p>
                                <p className="font-semibold capitalize text-green-600">{orderData.paymentDetails.payment_status}</p>
                            </div>
                        </div>

                        <div className="mb-3">
                            <p className="text-sm text-gray-600">Transaction ID</p>
                            <p className="font-semibold text-sm">{orderData.transactionId}</p>
                        </div>

                        <div className="border-t pt-3">
                            <div className="flex justify-between font-bold text-lg text-green-600">
                                <span>Total Amount Paid:</span>
                                <span>{displayBDTCurrency(orderData.totalAmount)}</span>
                            </div>
                        </div>
                    </div>
                )}

                {!orderData && transactionId && (
                    <div className="bg-yellow-50 rounded-lg p-4 mb-6">
                        <p className="text-yellow-800 text-center">
                            Your payment was successful! Order details will be available shortly.
                        </p>
                        <p className="text-sm text-yellow-600 text-center mt-2">
                            Transaction ID: {transactionId}
                        </p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link 
                        to={"/order"} 
                        className='p-3 px-6 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white transition-colors text-center'
                    >
                        View All Orders
                    </Link>
                    <Link 
                        to={"/"} 
                        className='p-3 px-6 border-2 border-blue-600 rounded font-semibold text-blue-600 hover:bg-blue-600 hover:text-white transition-colors text-center'
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Success