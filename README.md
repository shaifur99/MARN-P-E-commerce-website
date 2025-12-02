# 📋 Project Overview

Marn-Prack-Project is a full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) with integrated SSLCommerz payment gateway for Bangladesh market.


# Key Features

## 👥 User Features

✅ User registration and authentication

✅ Product browsing and searching

✅ Category-based product filtering

✅ Shopping cart management

✅ Order placement with SSLCommerz payment

✅ Order history tracking

✅ User profile management


##  Admin Features

✅ Dashboard with analytics

✅ Product management (CRUD operations)

✅ User management

✅ Order management with multiple statuses

✅ Real-time order tracking

✅ Sales reporting



## 💳 Payment System

✅ SSLCommerz integration (Bangladesh)

✅ Multiple payment status handling

✅ Secure transaction processing

✅ Success/Failure/Cancellation handling

✅ Order confirmation emails (ready for implementation)



## 💳  For Demo Payment 

Card Number: 4111111111111111

Expiry Date: Any future date

CVV: 123


## Project Structure


Marn-Prack-Project/
│
├── backend/                          # Node.js/Express Backend
│   ├── config/
│   │   ├── db.js                    # MongoDB connection configuration
│   │   ├── sslcommerz.js           # SSLCommerz payment gateway config
│   │   └── stripe.js               # Stripe config (optional)
│   │
│   ├── controller/
│   │   ├── order/
│   │   │   ├── allOrder.controller.js     # Get all orders (admin)
│   │   │   ├── order.controller.js        # User order operations
│   │   │   └── paymentController.js       # SSLCommerz payment handling
│   │   │
│   │   ├── product/
│   │   │   ├── filterProduct.js           # Product filtering
│   │   │   ├── getCategoryProductOne.js   # Single category products
│   │   │   ├── getCategoryWiseProduct.js  # Category-wise products
│   │   │   ├── getProduct.js              # Get all products
│   │   │   ├── getProductDetails.js       # Product details
│   │   │   ├── searchProduct.js           # Product search
│   │   │   ├── updateProduct.js           # Update product
│   │   │   └── uploadProduct.js           # Upload new product
│   │   │
│   │   └── user/
│   │       ├── addToCartController.js      # Add to cart
│   │       ├── addToCartViewProduct.js     # View cart items
│   │       ├── allUsers.js                 # Get all users (admin)
│   │       ├── countAddToCartProduct.js    # Count cart items
│   │       ├── deleteAddToCartProduct.js   # Remove from cart
│   │       ├── updateAddToCartProduct.js   # Update cart quantity
│   │       ├── updateUser.js               # Update user profile
│   │       ├── userDetails.js              # Get user details
│   │       ├── userLogout.js               # User logout
│   │       ├── userSignIn.js               # User login
│   │       └── userSignUp.js               # User registration
│   │
│   ├── helpers/
│   │   └── permission.js                   # User role permissions
│   │
│   ├── middleware/
│   │   └── authToken.js                    # JWT authentication middleware
│   │
│   ├── models/
│   │   ├── cartProduct.js                  # Cart schema/model
│   │   ├── orderProductModel.js            # Order schema/model
│   │   ├── productModel.js                 # Product schema/model
│   │   └── userModel.js                    # User schema/model
│   │
│   ├── routes/
│   │   └── index.js                        # All API routes
│   │
│   ├── .env                                # Environment variables
│   ├── index.js                            # Main server file
│   ├── package.json                        # Backend dependencies
│   └── vercel.json                         # Vercel deployment config
│
├── frontend/                              # React.js Frontend
│   ├── public/                            # Static files
│   │
│   ├── src/
│   │   ├── assets/                        # Images, icons, etc.
│   │   │
│   │   ├── common/
│   │   │   ├── index.js                   # API endpoints configuration
│   │   │   └── role.js                    # User role constants
│   │   │
│   │   ├── components/
│   │   │   ├── AdminEditProduct.js        # Admin product editing
│   │   │   ├── AdminProductCard.js        # Product card for admin
│   │   │   ├── BannerProduct.js           # Product banner
│   │   │   ├── CategoryList.js            # Category listing
│   │   │   ├── CategoryWiseProductDisplay.js # Category products display
│   │   │   ├── ChangeUserRole.js          # Admin user role management
│   │   │   ├── DisplayImage.js            # Image display component
│   │   │   ├── Footer.js                  # Page footer
│   │   │   ├── Header.js                  # Navigation header
│   │   │   ├── HorizontalCardProduct.js   # Horizontal product card
│   │   │   ├── Logo.js                    # Application logo
│   │   │   ├── UploadProduct.js           # Product upload form
│   │   │   ├── VerticalCard.js            # Vertical card layout
│   │   │   └── VerticalCardProduct.js     # Vertical product card
│   │   │
│   │   ├── context/
│   │   │   └── index.js                   # React context API
│   │   │
│   │   ├── helpers/
│   │   │   ├── addToCart.js               # Cart helper functions
│   │   │   ├── displayCurrency.js         # Currency formatting (BDT)
│   │   │   ├── fetchCategoryWiseProduct.js # Category product fetching
│   │   │   ├── imageTobase64.js           # Image to base64 conversion
│   │   │   ├── productCategory.js         # Product category helpers
│   │   │   ├── scrollTop.js               # Scroll to top helper
│   │   │   └── uploadImage.js             # Image upload helper
│   │   │
│   │   ├── pages/
│   │   │   ├── AdminPanel.js              # Admin dashboard
│   │   │   ├── AllOrder.js                # View all orders (admin)
│   │   │   ├── AllProducts.js             # All products listing
│   │   │   ├── AllUsers.js                # All users (admin)
│   │   │   ├── Cancel.js                  # Payment cancellation page
│   │   │   ├── Cart.js                    # Shopping cart
│   │   │   ├── CategoryProduct.js         # Category products page
│   │   │   ├── ForgotPassword.js          # Password recovery
│   │   │   ├── Home.js                    # Home page
│   │   │   ├── Login.js                   # Login page
│   │   │   ├── OrderPage.js               # User orders page
│   │   │   ├── ProductDetails.js          # Product details page
│   │   │   ├── SearchProduct.js           # Search results page
│   │   │   ├── SignUp.js                  # Registration page
│   │   │   └── Success.js                 # Payment success page
│   │   │
│   │   ├── routes/
│   │   │   └── index.js                   # React Router configuration
│   │   │
│   │   ├── store/
│   │   │   ├── store.js                   # Redux store configuration
│   │   │   └── userSlice.js               # User state management
│   │   │
│   │   ├── App.css                        # Main CSS styles
│   │   ├── App.js                         # Root React component
│   │   ├── App.test.js                    # Test file
│   │   ├── index.css                      # Global CSS
│   │   ├── index.js                       # React entry point
│   │   ├── reportWebVitals.js             # Performance reporting
│   │   └── setupTests.js                  # Test setup
│   │
│   ├── .env                               # Frontend environment variables
│   ├── package.json                       # Frontend dependencies
│   ├── tailwind.config.js                 # Tailwind CSS configuration
│   └── ... (other config files)
│
└── README.md                             # This file



## Installation & Setup 

Prerequisites

1. Node.js (v14 or higher)

2. MongoDB (Atlas or local)

3. npm or yarn

## Backend Setup

# Clone and navigate to backend
    cd Marn-Prack-Project/backend

# Install dependencies
    npm install

# Create .env file with following variables
     cp .env.example .env

# Edit .env file with your configurations
# Required variables:

MONGODB_URI=your_mongodb_connection_string
TOKEN_SECRET_KEY=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8080
SSLCOMMERZ_STORE_ID=your_sslcommerz_store_id
SSLCOMMERZ_STORE_PASSWORD=your_sslcommerz_store_password

# Start backend server
npm run dev


Frontend Setup

# Navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_BACKEND_URL=http://localhost:8080" > .env

# Start frontend development server
npm start



# 🔧 Configuration

SSLCommerz Configuration

Register at SSLCommerz

Get Store ID and Store Password

Configure in backend .env file:
    
    SSLCOMMERZ_STORE_ID=your_store_id
    SSLCOMMERZ_STORE_PASSWORD=your_store_password




## User Model
   {
  name: String,
  email: { type: String, unique: true },
  password: String,
  profilePic: String,
  role: String, // 'ADMIN' or 'GENERAL'
  createdAt: Date,
  updatedAt: Date
}

## Product Model
javascript
{
  productName: String,
  brandName: String,
  category: String,
  productImage: [String],
  description: String,
  price: Number,
  sellingPrice: Number,
  createdAt: Date,
  updatedAt: Date
}


## Cart Model
javascript
{
  productId: String, // ref to product
  quantity: Number,
  userId: String,
  createdAt: Date,
  updatedAt: Date
}


## Order Model
javascript
{
  transactionId: String,
  paymentDetails: {
    payment_method_type: [String],
    payment_status: String, // Pending, Completed, Failed, Cancelled
    transactionId: String,
    payment_date: Date
  },
  totalAmount: Number,
  productDetails: [{
    productId: ObjectId,
    name: String,
    image: [String],
    price: Number,
    quantity: Number
  }],
  shippingDetails: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    country: String
  },
  userId: ObjectId,
  status: String, // Pending, Processing, Confirmed, Shipped, Delivered, Cancelled
  notes: String,
  createdAt: Date,
  updatedAt: Date
}



# 🔒 Security Features


JWT-based authentication

Password encryption with bcrypt

Role-based access control

Input validation and sanitization

Secure payment processing

CORS configuration

Environment variable management

# 👥 Authors
Shaifur Rahman - Initial work

# 🙏 Acknowledgments

SSLCommerz for payment gateway

MongoDB Atlas for database hosting

All contributors and testers