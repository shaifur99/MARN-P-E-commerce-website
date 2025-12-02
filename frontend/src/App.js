// Import files and components
import './App.css';

// Outlet loads child routes inside the layout
import { Outlet } from 'react-router-dom';

// Common components
import Header from './components/Header';
import Footer from './components/Footer';

// Toast notification library
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React hooks
import { useEffect, useState, useCallback } from 'react';

// Global API list
import SummaryApi from './common';

// Custom context to share data between components
import Context from './context';

// Redux functions
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  // Used to update Redux store
  const dispatch = useDispatch();

  // State for storing how many products user added to cart
  const [cartProductCount, setCartProductCount] = useState(0);

  // API call: fetch logged-in user's details
  const fetchUserDetails = useCallback(async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include',   // send cookies with request
      });

      const dataApi = await dataResponse.json();

      // If user exists then store data in Redux state
      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }, [dispatch]);

  // API call: fetch how many products user added to cart
  const fetchUserAddToCart = useCallback(async () => {
    try {
      const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        credentials: 'include',
      });

      const dataApi = await dataResponse.json();

      // Update cart count state
      setCartProductCount(dataApi?.data?.count || 0);
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartProductCount(0);
    }
  }, []);

  // Function to process demo payment
  const processDemoPayment = useCallback(async (cartItems, user) => {
    try {
      const paymentData = {
        cartItems: cartItems,
        userId: user?._id,
        shippingInfo: {
          name: user?.name,
          email: user?.email
        }
      };

      const response = await fetch(SummaryApi.payment.url, {
        method: SummaryApi.payment.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      });

      const responseData = await response.json();
      
      if (responseData.success) {
        // Redirect to demo payment page
        window.location.href = responseData.paymentUrl;
        return { success: true, data: responseData };
      } else {
        return { success: false, message: responseData.message };
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      return { success: false, message: 'Payment processing failed' };
    }
  }, []);

  // Function to handle payment callback
  const handlePaymentCallback = useCallback(async (transactionId, status) => {
    try {
      const response = await fetch(`/api/demo-payment/process/${transactionId}?status=${status}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      
      if (result.success) {
        // Refresh cart count after successful payment
        fetchUserAddToCart();
        return { success: true, orderId: result.orderId };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Payment callback error:', error);
      return { success: false, message: 'Payment callback failed' };
    }
  }, [fetchUserAddToCart]);

  // useEffect runs when component loads first time
  useEffect(() => {
    fetchUserDetails();     // Fetch user info from server
    fetchUserAddToCart();   // Fetch cart product count
  }, [fetchUserDetails, fetchUserAddToCart]);

  return (
    <>
      {/* Sharing functions and data using Context.Provider */}
      <Context.Provider value={{
        fetchUserDetails,      // Function to fetch user details
        cartProductCount,      // Cart product count for current user
        fetchUserAddToCart,    // Function to update cart count
        processDemoPayment,    // Function to process demo payment
        handlePaymentCallback  // Function to handle payment callback
      }}>

        {/* Toast message container */}
        <ToastContainer 
          position='top-center'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        {/* Website header */}
        <Header />

        {/* Main content area where pages will be displayed */}
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet /> {/* Child route pages will load here */}
        </main>

        {/* Website footer */}
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;