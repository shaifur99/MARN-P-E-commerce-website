import React, { useState } from 'react' // Import React and useState hook
import ROLE from '../common/role' // Import ROLE object containing possible roles
import { IoMdClose } from "react-icons/io"; // Import close icon from react-icons
import SummaryApi from '../common'; // Import API endpoints from common file
import { toast } from 'react-toastify'; // Import toast for notifications

// ChangeUserRole component: a popup/modal to change a user's role
const ChangeUserRole = ({
    name,      // User's name
    email,     // User's email
    role,      // Current role of the user
    userId,    // User's unique ID
    onClose,   // Function to close the modal
    callFunc,  // Function to refresh data after role change
}) => {
    const [userRole,setUserRole] = useState(role) // State to track selected role, initialized with current role

    // Function to handle role selection change
    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value) // Update state with selected role
        console.log(e.target.value) // Log selected role for debugging
    }

    // Function to send API request to update the user's role
    const updateUserRole = async() =>{
        const fetchResponse = await fetch(SummaryApi.updateUser.url,{ // Call API URL
            method : SummaryApi.updateUser.method, // Use correct HTTP method (PUT/POST)
            credentials : 'include', // Include cookies with request
            headers : {
                "content-type" : "application/json" // Set JSON header
            },
            body : JSON.stringify({ // Send userId and new role in request body
                userId : userId,
                role : userRole
            })
        })

        const responseData = await fetchResponse.json() // Parse JSON response

        if(responseData.success){ // If update successful
            toast.success(responseData.message) // Show success toast
            onClose() // Close the modal
            callFunc() // Refresh data in parent component
        }

        console.log("role updated",responseData) // Log response for debugging
    }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
       {/* Modal background overlay */}
       <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
            {/* Modal content container */}
     
            <button className='block ml-auto' onClick={onClose}> 
                {/* Close button for ml means margin auto  */}
                <IoMdClose/> {/* Close icon */}
            </button>

            <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
            {/* Modal title */}

             <p>Name : {name}</p>   {/* Display user name */}
             <p>Email : {email}</p> {/* Display user email */}

            <div className='flex items-center justify-between my-4'>
                <p>Role :</p>  {/* Label for role selector */}
                <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                    {/* Dropdown to select role */}
                    {
                        Object.values(ROLE).map(el => {
                            return(
                                <option value={el} key={el}>{el}</option>
                                // Render each possible role as option
                            )
                        })
                    }
                </select>
            </div>

            {/* Button to trigger role update */}
            <button className='w-fit mx-auto block  py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateUserRole}>
                Change Role
            </button>
       </div>
    </div>
  )
}

export default ChangeUserRole // Export component for use in other files
