// Import React and hooks (useEffect, useState)
import React, { useEffect, useState } from 'react'

// Import API endpoint collection
import SummaryApi from '../common'

// For showing toast notifications
import { toast } from 'react-toastify'

// For formatting date/time easily
import moment from 'moment'

// Edit icon for action button
import { MdModeEdit } from "react-icons/md";

// Component used to change user role in popup
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {

    // Store all users list
    const [allUser,setAllUsers] = useState([])

    // Control modal open/close for updating user role
    const [openUpdateRole,setOpenUpdateRole] = useState(false)

    // Store selected user details to update
    const [updateUserDetails,setUpdateUserDetails] = useState({
        email : "",
        name : "",
        role : "",
        _id  : ""
    })

    // Fetch all users from backend API
    const fetchAllUsers = async() =>{
        
        // API call with fetch
        const fetchData = await fetch(SummaryApi.allUser.url,{
            method : SummaryApi.allUser.method,
            credentials : 'include'        // send cookies with request
        })

        // Convert response to JSON
        const dataResponse = await fetchData.json()

        // If success → set users in state
        if(dataResponse.success){
            setAllUsers(dataResponse.data)
        }

        // If any error → show toast message
        if(dataResponse.error){
            toast.error(dataResponse.message)
        }

    }

    // Load all users on first page load
    useEffect(()=>{
        fetchAllUsers()
    },[])   // empty dependency: runs only once

  return (
    <div className='bg-white pb-4'>
        
        {/* Table for showing users list */}
        <table className='w-full userTable'>
            <thead>
                <tr className='bg-black text-white'>
                    <th>Sr_No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th>Action</th>
                </tr>
            </thead>

            {/* Table body shows data from allUser array */}
            <tbody className=''>
                {
                    allUser.map((el,index) => {
                        return(
                            <tr>
                                {/* User serial number */}
                                <td>{index+1}</td>

                                {/* User name */}
                                <td>{el?.name}</td>

                                {/* User email */}
                                <td>{el?.email}</td>

                                {/* User role */}
                                <td>{el?.role}</td>

                                {/* Format createdAt date into readable form */}
                                <td>{moment(el?.createdAt).format('LL')}</td>

                                {/* Action button to open edit modal */}
                                <td>
                                    <button 
                                        className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                                        onClick={()=>{
                                            // Set selected user details to modal
                                            setUpdateUserDetails(el)

                                            // Open modal
                                            setOpenUpdateRole(true)
                                        }}
                                    >
                                        {/* Edit icon */}
                                        <MdModeEdit/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>

        {/* If modal open → show ChangeUserRole component */}
        {
            openUpdateRole && (
                <ChangeUserRole 
                    onClose={()=>setOpenUpdateRole(false)}     // close modal
                    name={updateUserDetails.name}              // send name
                    email={updateUserDetails.email}            // send email
                    role={updateUserDetails.role}              // send role
                    userId={updateUserDetails._id}             // send user ID
                    callFunc={fetchAllUsers}                   // refresh list after update
                />
            )      
        }
    </div>
  )
}

// Export component for external use
export default AllUsers
