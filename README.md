# Project Overview

Marn-Prack-Project is a full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) with integrated SSLCommerz payment gateway for Bangladesh market.


# Key Features

## User Features

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



## Payment System

✅ SSLCommerz integration (Bangladesh)

✅ Multiple payment status handling

✅ Secure transaction processing

✅ Success/Failure/Cancellation handling

✅ Order confirmation emails (ready for implementation)



## For Demo Payment 

Card Number: 4111111111111111

Expiry Date: Any future date

CVV: 123




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



# Configuration

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



# Security Features


JWT-based authentication

Password encryption with bcrypt

Role-based access control

Input validation and sanitization

Secure payment processing

CORS configuration

Environment variable management

# Authors
Shaifur Rahman - Initial work

# Acknowledgments

SSLCommerz for payment gateway

MongoDB Atlas for database hosting

All contributors and testers

# Important: Reinstall dependencies locally Since I  removed node_modules, you need to reinstall them for your project to work:


## For frontend
    cd frontend
    npm install

## For backend (if you have one)
    cd ../backend
    npm install

# Verify your .gitignore is working Check your .gitignore file contains:


    cat .gitignore
## It should include at least:

        node_modules/
        
        .env
        
        .DS_Store
        
        Build directories

# 4. For future development  Now you can work normally:


# Make changes
    git add .
    git commit -m "Your commit message"
    git push


## If You(with out my local compputer) clone your repo

##They should run:


    git clone https://github.com/shaifur99/MARN-P-E-commerce-website.git
    cd MARN-P-E-commerce-website
    cd frontend && npm install
    cd ../backend && npm install  # if you have backend
## Quick verification:

    # Check git status
    git status
    
    # Check what's tracked
    git ls-files
    
    # Check remote
    git remote -v
