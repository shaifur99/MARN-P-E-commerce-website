// Import React and useEffect hook
import React, { useEffect } from 'react'
// Import useSelector to access redux state
import { useSelector } from 'react-redux'
// Import user icon
import { FaRegCircleUser } from "react-icons/fa6";
// Import Link, Outlet, navigate hook for routing
import { Link, Outlet, useNavigate } from 'react-router-dom';
// Import role constants
import ROLE from '../common/role';

const AdminPanel = () => {

    // Get logged-in user data from redux store
    const user = useSelector(state => state?.user?.user)

    // For redirecting user
    const navigate = useNavigate()

    // Check: if user is not admin → redirect to home
    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN){
            navigate("/")//if user is not admin admin panel off and home page will open
        }
    },[user,navigate])  // Run when user changes

  return (
    // Main wrapper: visible only in medium screen (md:flex)
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>

        {/* Sidebar section */}
        <aside className='bg-white min-h-full w-full max-w-60 customShadow'>

                {/* User profile top area */}
                <div className='h-32 flex justify-center items-center flex-col'>

                    {/* Profile picture container */}
                    <div className='text-5xl cursor-pointer relative flex justify-center'>
                        {
                        // If user has uploaded profile picture → show it
                        user?.profilePic ? (
                            <img 
                                src={user?.profilePic} 
                                className='w-20 h-20 rounded-full' 
                                alt={user?.name} 
                            />
                        ) : (
                            // Else show default user icon
                            <FaRegCircleUser/>
                        )
                        }
                    </div>

                    {/* User name */}
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>

                    {/* User role */}
                    <p className='text-sm'>{user?.role}</p>
                </div>

                {/*** Navigation menu section */}
                <div>   
                    <nav className='grid p-4'>
                        {/* Link to all users page */}
                        <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>
                            All Users
                        </Link>

                        {/* Link to all products page */}
                        <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>
                            All product
                        </Link>

                        {/* Link to all orders page */}
                        <Link to={"all-orders"} className='px-2 py-1 hover:bg-slate-100'>
                            All Orders
                        </Link>
                    </nav>
                </div>  
        </aside>

        {/* Main content area where nested routes will be shown */}
        <main className='w-full h-full p-2'>
            <Outlet/>   {/* This renders the child route component */}
        </main>
    </div>
  )
}

// Export component for use in other files
export default AdminPanel
