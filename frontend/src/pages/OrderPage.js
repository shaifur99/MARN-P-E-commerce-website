import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayBDTCurrency from '../helpers/displayCurrency'

const OrderPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(SummaryApi.getOrder.url, {
        method: SummaryApi.getOrder.method,
        credentials: 'include'
      })

      const responseData = await response.json()
      
      if (responseData.success) {
        setData(responseData.data || [])
      } else {
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Orders</h1>
      
      {!data || data.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-xl text-gray-600 mb-4">No Orders Available</p>
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((order, index) => {
            const orderDate = order.createdAt ? moment(order.createdAt).format('LL') : 'Date not available';
            const totalAmount = order.totalAmount || 0;
            const paymentMethod = order.paymentDetails?.payment_method_type?.[0] || 'Not specified';
            const paymentStatus = order.paymentDetails?.payment_status || 'Unknown';
            const shippingAmount = order.shipping_options?.[0]?.shipping_amount || 0;

            return (
              <div key={order._id || index} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                {/* Order Header */}
                <div className="bg-red-600 text-white p-4">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                    <div>
                      <p className="font-semibold text-lg">Order Date: {orderDate}</p>
                      <p className="text-blue-100">Order ID: {order.orderId || order._id}</p>
                    </div>
                    <div className="mt-2 lg:mt-0">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        paymentStatus === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}>
                        {paymentStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Products Section */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-4 text-gray-800 border-b pb-2">Products</h3>
                      <div className="space-y-4">
                        {order.productDetails?.map((product, productIndex) => (
                          <div key={productIndex} className="flex gap-4 bg-gray-50 p-4 rounded-lg border">
                            <img 
                              src={product.image?.[0] || 'https://via.placeholder.com/150'}
                              alt={product.name}
                              className="w-24 h-24 bg-white rounded border object-scale-down p-2"
                            />
                            <div className="flex-1">
                              <div className="font-semibold text-lg text-gray-800 mb-2">
                                {product.name || 'Product Name'}
                              </div>
                              <div className="flex flex-wrap gap-4 items-center">
                                <div className="text-lg font-bold text-red-600">
                                  {displayBDTCurrency(product.price || 0)}
                                </div>
                                <p className="text-gray-600">Quantity: {product.quantity || 1}</p>
                                <div className="text-lg font-semibold text-green-600">
                                  Total: {displayBDTCurrency((product.price || 0) * (product.quantity || 1))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Payment & Shipping Details */}
                    <div className="lg:w-80 space-y-6">
                      {/* Payment Details */}
                      <div className="bg-gray-50 rounded-lg p-4 border">
                        <h4 className="font-semibold text-lg mb-3 text-gray-800 border-b pb-2">Payment Details</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Method:</span>
                            <span className="font-semibold capitalize">{paymentMethod}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className={`font-semibold ${
                              paymentStatus === 'completed' ? 'text-green-600' : 'text-yellow-600'
                            }`}>
                              {paymentStatus}
                            </span>
                          </div>
                          {order.paymentDetails?.transactionId && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Transaction ID:</span>
                              <span className="font-semibold text-sm">{order.paymentDetails.transactionId}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Shipping Details */}
                      <div className="bg-gray-50 rounded-lg p-4 border">
                        <h4 className="font-semibold text-lg mb-3 text-gray-800 border-b pb-2">Shipping Details</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Shipping Cost:</span>
                            <span className="font-semibold">{displayBDTCurrency(shippingAmount)}</span>
                          </div>
                          {order.shippingDetails && (
                            <>
                              <div className="border-t pt-2 mt-2">
                                <p className="text-gray-600 mb-1">Deliver to:</p>
                                <p className="font-semibold">{order.shippingDetails.name}</p>
                                <p className="text-sm text-gray-600">{order.shippingDetails.address}</p>
                                <p className="text-sm text-gray-600">{order.shippingDetails.phone}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Total Amount */}
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
                          <span className="text-xl font-bold text-green-600">
                            {displayBDTCurrency(totalAmount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default OrderPage