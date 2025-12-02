const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
    paymentDetails: {
        payment_method_type: [String],
        payment_status: {
            type: String,
            enum: ['Pending', 'Completed', 'Failed', 'Cancelled'],
            default: 'Pending'
        },
        transactionId: String
    },
    totalAmount: {
        type: Number,
        required: true
    },
    productDetails: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
            required: true
        },
        name: String,
        image: [String],
        price: Number,
        quantity: Number
    }],
    shippingDetails: {
        name: String,
        email: String,
        phone: String,
        address: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Completed', 'Failed'],
        default: 'Pending'
    }
}, {
    timestamps: true
});

const OrderModel = mongoose.model("order", orderSchema);
module.exports = OrderModel;