import React, { useContext, useState } from 'react' // Import React and hooks
import Logo from './Logo' // Import Logo component
import { GrSearch } from "react-icons/gr"; // Search icon
import { FaRegCircleUser } from "react-icons/fa6"; // User icon
import { FaShoppingCart } from "react-icons/fa"; // Cart icon
import { Link, useLocation, useNavigate } from 'react-router-dom' // React Router tools
import { useDispatch, useSelector } from 'react-redux' // Redux hooks
import SummaryApi from '../common'; // API endpoints
import { toast } from 'react-toastify' // Toast notifications
import { setUserDetails } from '../store/userSlice' // Redux action to update user state
import ROLE from '../common/role'; // User roles
import Context from '../context'; // App context

// Header component
const Header = () => {
  const user = useSelector(state => state?.user?.user) // Get user data from Redux store
  const dispatch = useDispatch() // Redux dispatch function
  const [menuDisplay,setMenuDisplay] = useState(false) // Toggle for user menu dropdown
  const context = useContext(Context) // Access context for cart count
  const navigate = useNavigate() // Navigation hook
  const searchInput = useLocation() // Get current URL
  const URLSearch = new URLSearchParams(searchInput?.search) // Parse query params
  const searchQuery = URLSearch.getAll("q") // Get 'q' search parameter
  const [search,setSearch] = useState(searchQuery) // State to store search input

  // Logout function
  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method, // HTTP method
      credentials : 'include' // Include cookies
    })

    const data = await fetchData.json() // Parse response

    if(data.success){ // If logout successful
      toast.success(data.message) // Show success message
      dispatch(setUserDetails(null)) // Clear user from Redux store
      navigate("/") // Redirect to home
    }

    if(data.error){ // If error occurs
      toast.error(data.message) // Show error message
    }
  }

  // Handle search input change
  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value) // Update search state

    if(value){
      navigate(`/search?q=${value}`) // Navigate to search results
    }else{
      navigate("/search") // Navigate to search page without query
    }
  }

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      {/* Header container */}
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        
        {/* Logo */}
        <div className=''>
          <Link to={"/"}>
            <Logo w={90} h={50}/> {/* Render Logo component */}
          </Link>
        </div>

        {/* Search input (hidden on small screens) */}
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input 
            type='text' 
            placeholder='search product here...' 
            className='w-full outline-none' 
            onChange={handleSearch} // Call handleSearch on input change
            value={search} // Controlled input
          />
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch /> {/* Search icon */}
          </div>
        </div>

        {/* Right side: user menu, cart, login/logout */}
        <div className='flex items-center gap-7'>

          {/* User icon & dropdown */}
          <div className='relative flex justify-center'>
            {user?._id && (
              <div 
                className='text-3xl cursor-pointer relative flex justify-center' 
                onClick={()=>setMenuDisplay(preve => !preve)} // Toggle menu
              >
                {user?.profilePic ? (
                  <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                ) : (
                  <FaRegCircleUser/> // Default user icon
                )}
              </div>
            )}

            {/* Dropdown menu */}
            {menuDisplay && (
              <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link 
                      to={"/admin-panel/all-products"} 
                      className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' 
                      onClick={()=>setMenuDisplay(preve => !preve)} // Close menu after click
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link 
                    to={'/order'} 
                    className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' 
                    onClick={()=>setMenuDisplay(preve => !preve)} // Close menu after click
                  >
                    Order
                  </Link>
                </nav>
              </div>
            )}
          </div>

          {/* Shopping cart icon */}
          {user?._id && (
            <Link to={"/cart"} className='text-2xl relative'>
              <span><FaShoppingCart/></span>
              <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                <p className='text-sm'>{context?.cartProductCount}</p> {/* Show cart count */}
              </div>
            </Link>
          )}

          {/* Login/Logout button */}
          <div>
            {user?._id ? (
              <button 
                onClick={handleLogout} 
                className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'
              >
                Logout
              </button>
            ) : (
              <Link 
                to={"/login"} 
                className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'
              >
                Login
              </Link>
            )}
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header // Export Header component
