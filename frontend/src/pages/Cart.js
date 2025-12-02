import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayBDTCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [paymentLoading, setPaymentLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(4).fill(null)

    const fetchData = async() => {
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        })

        const responseData = await response.json()

        if(responseData.success) {
            setData(responseData.data)
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchData()
        setLoading(false)
    }, [])

    const increaseQty = async(id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty + 1
            })
        })

        const responseData = await response.json()

        if(responseData.success) {
            fetchData()
        }
    }

    const decraseQty = async(id, qty) => {
        if(qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty - 1
                })
            })

            const responseData = await response.json()

            if(responseData.success) {
                fetchData()
            }
        }
    }

    const deleteCartProduct = async(id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                _id: id,
            })
        })

        const responseData = await response.json()

        if(responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const handlePayment = async() => {
        if (data.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        setPaymentLoading(true);
        
        try {
            console.log("🔄 Starting payment process...");
            console.log("📦 Cart items:", data);
            console.log("🎯 API URL:", SummaryApi.payment.url);
            
            const response = await fetch(SummaryApi.payment.url, {
                method: SummaryApi.payment.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    cartItems: data
                })
            });

            console.log("📡 Response status:", response.status);
            console.log("📡 Response OK:", response.ok);

            const responseData = await response.json();
            console.log("💳 Payment response:", responseData);
            
            if (responseData.success && responseData.paymentUrl) {
                console.log("✅ Redirecting to:", responseData.paymentUrl);
                toast.success("Redirecting to SSLCommerz payment gateway...");
                // Wait a moment for toast to show
                setTimeout(() => {
                    window.location.href = responseData.paymentUrl;
                }, 1500);
            } else {
                console.error("❌ Payment failed:", responseData);
                toast.error(responseData.message || "Payment initiation failed. Please try again.");
            }

        } catch (error) {
            console.error("💥 Payment error:", error);
            toast.error("Payment processing failed. Please check console for details.");
        } finally {
            setPaymentLoading(false);
        }
    }

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0)

    return (
        <div className='container mx-auto mt-16'>
            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-5'>No products in cart</p>
                    )
                }
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>   
                {/***view product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart?.map((el, index) => {
                                return(
                                    <div key={el+"Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })
                        ) : (
                            data.map((product, index) => {
                                return(
                                    <div key={product?._id+"Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                        <div className='w-32 h-32 bg-slate-200'>
                                            <img 
                                                src={product?.productId?.productImage[0]} 
                                                className='w-full h-full object-scale-down mix-blend-multiply' 
                                                alt={product?.productId?.productName}
                                            />
                                        </div>
                                        <div className='px-4 py-2 relative'>
                                            {/**delete product */}
                                            <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product?._id)}>
                                                <MdDelete/>
                                            </div>

                                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                            <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                                            <div className='flex items-center justify-between'>
                                                <p className='text-red-600 font-medium text-lg'>{displayBDTCurrency(product?.productId?.sellingPrice)}</p>
                                                <p className='text-slate-600 font-semibold text-lg'>{displayBDTCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                            </div>
                                            <div className='flex items-center gap-3 mt-1'>
                                                <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => decraseQty(product?._id, product?.quantity)}>-</button>
                                                <span>{product?.quantity}</span>
                                                <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                                            </div>
                                        </div>    
                                    </div>
                                )
                            })
                        )
                    }
                </div>

                {/***summary  */}
                {
                    data[0] && (
                        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                            {
                                loading ? (
                                    <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'></div>
                                ) : (
                                    <div className='h-auto bg-white border rounded-lg shadow-sm'>
                                        <h2 className='text-white bg-red-600 px-4 py-2 rounded-t-lg font-semibold'>Order Summary</h2>
                                        <div className='p-4'>
                                            <div className='flex items-center justify-between gap-2 font-medium text-lg text-slate-600 mb-3'>
                                                <p>Total Items</p>
                                                <p>{totalQty}</p>
                                            </div>

                                            <div className='flex items-center justify-between gap-2 font-medium text-lg text-slate-600 mb-4'>
                                                <p>Total Price</p>
                                                <p className='text-green-600 font-bold'>{displayBDTCurrency(totalPrice)}</p>    
                                            </div>

                                            <button 
                                                className={`bg-green-600 p-3 text-white w-full mt-2 rounded-lg font-semibold hover:bg-green-700 transition-colors ${paymentLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                onClick={handlePayment}
                                                disabled={paymentLoading}
                                            >
                                                {paymentLoading ? 'Processing...' : `Pay ${displayBDTCurrency(totalPrice)}`}
                                            </button>
                                            
                                            <p className='text-xs text-gray-500 mt-3 text-center'>
                                                You will be redirected to SSLCommerz secure payment page
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Cart