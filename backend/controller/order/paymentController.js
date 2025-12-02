const axios = require('axios');
const orderProductModel = require('../../models/orderProductModel');
const cartProductModel = require('../../models/cartProduct');
const userModel = require('../../models/userModel');

// Initiate SSLCommerz Payment
const initiatePayment = async (request, response) => {
    try {
        const userId = request.userId;
        const { cartItems } = request.body;

        console.log("🚀 Payment initiation started for user:", userId);

        // Get user details
        const user = await userModel.findById(userId);
        if (!user) {
            return response.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Calculate total amount
        const total_amount = cartItems.reduce((total, item) => {
            return total + (item.quantity * item.productId.sellingPrice);
        }, 0);

        // Ensure minimum amount for SSLCommerz
        const final_amount = total_amount;
        
        // Generate unique transaction ID
        const transactionId = "TXN_" + Date.now() + Math.floor(Math.random() * 1000);

        console.log("💰 Final Amount:", final_amount);
        console.log("🆔 Transaction ID:", transactionId);

        // Create pending order in database
        const order = new orderProductModel({
            transactionId: transactionId,
            paymentDetails: {
                payment_method_type: ['SSLCommerz'],
                payment_status: 'Pending',
                transactionId: transactionId
            },
            totalAmount: final_amount,
            productDetails: cartItems.map(item => ({
                productId: item.productId._id,
                name: item.productId.productName,
                image: item.productId.productImage[0],
                price: item.productId.sellingPrice,
                quantity: item.quantity
            })),
            shippingDetails: {
                name: user.name,
                email: user.email,
                phone: '01700000000',
                address: 'Dhaka, Bangladesh'
            },
            userId: userId,
            status: 'Pending'
        });

        await order.save();
        console.log("✅ Order saved successfully");

        // Create SSLCommerz payment data
        const paymentData = new URLSearchParams({
            store_id: process.env.SSLCOMMERZ_STORE_ID,
            store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD,
            total_amount: final_amount,
            currency: 'BDT',
            tran_id: transactionId,
            success_url: `${process.env.BACKEND_URL}/api/payment/success/${transactionId}`,
            fail_url: `${process.env.BACKEND_URL}/api/payment/fail/${transactionId}`,
            cancel_url: `${process.env.BACKEND_URL}/api/payment/cancel/${transactionId}`,
            shipping_method: 'NO',
            product_name: 'Shopping Cart Products',
            product_category: 'General',
            product_profile: 'general',
            cus_name: user.name || 'Customer',
            cus_email: user.email,
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01700000000',
            cus_fax: '01700000000',
            ship_name: user.name || 'Customer',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: '1000',
            ship_country: 'Bangladesh'
        });

        console.log("📦 Calling SSLCommerz API...");

        // Direct API call to SSLCommerz
        const sslResponse = await axios.post(
            'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
            paymentData.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        console.log("🔗 SSLCommerz response status:", sslResponse.data.status);

        if (sslResponse.data.status === 'SUCCESS') {
            response.status(200).json({
                success: true,
                message: "Payment initiated successfully",
                paymentUrl: sslResponse.data.GatewayPageURL,
                transactionId: transactionId
            });
        } else {
            console.error("❌ SSLCommerz initiation failed:", sslResponse.data);
            throw new Error(sslResponse.data.failedreason || "Payment initiation failed");
        }

    } catch (error) {
        console.error("💥 Payment initiation error:", error.message);
        response.status(500).json({
            success: false,
            message: error.message || "Payment initiation failed",
            error: true
        });
    }
};

// Payment Success Handler
const paymentSuccess = async (request, response) => {
    try {
        const { transactionId } = request.params;
        
        console.log("✅ Payment success for transaction:", transactionId);

        // Update order status to completed
        const order = await orderProductModel.findOneAndUpdate(
            { transactionId: transactionId },
            { 
                status: 'Completed',
                'paymentDetails.payment_status': 'Completed'
            },
            { new: true }
        );

        if (order) {
            // Clear user's cart after successful payment
            await cartProductModel.deleteMany({ userId: order.userId });
            console.log("🛒 Cart cleared for user:", order.userId);
            
            // Redirect to frontend success page
            response.redirect(`${process.env.FRONTEND_URL}/success?transactionId=${transactionId}`);
        } else {
            console.error("❌ Order not found for transaction:", transactionId);
            response.redirect(`${process.env.FRONTEND_URL}/cancel?reason=order_not_found`);
        }
    } catch (error) {
        console.error("💥 Payment success error:", error);
        response.redirect(`${process.env.FRONTEND_URL}/cancel?reason=server_error`);
    }
};

// Payment Fail Handler
const paymentFail = async (request, response) => {
    try {
        const { transactionId } = request.params;
        
        console.log("❌ Payment failed for transaction:", transactionId);

        // Update order status to failed
        await orderProductModel.findOneAndUpdate(
            { transactionId: transactionId },
            { 
                status: 'Failed',
                'paymentDetails.payment_status': 'Failed'
            }
        );

        response.redirect(`${process.env.FRONTEND_URL}/cancel?transactionId=${transactionId}&reason=payment_failed`);
    } catch (error) {
        console.error("💥 Payment fail error:", error);
        response.redirect(`${process.env.FRONTEND_URL}/cancel?reason=server_error`);
    }
};

// Payment Cancel Handler
const paymentCancel = async (request, response) => {
    try {
        const { transactionId } = request.params;
        
        console.log("🚫 Payment cancelled for transaction:", transactionId);

        // Update order status to cancelled
        await orderProductModel.findOneAndUpdate(
            { transactionId: transactionId },
            { 
                status: 'Cancelled',
                'paymentDetails.payment_status': 'Cancelled'
            }
        );

        response.redirect(`${process.env.FRONTEND_URL}/cancel?transactionId=${transactionId}&reason=user_cancelled`);
    } catch (error) {
        console.error("💥 Payment cancel error:", error);
        response.redirect(`${process.env.FRONTEND_URL}/cancel?reason=server_error`);
    }
};

// Export all functions
module.exports = {
    initiatePayment,
    paymentSuccess,
    paymentFail,
    paymentCancel
};