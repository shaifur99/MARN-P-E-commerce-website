import React, { useState } from 'react' // Import React and useState hook
import { CgClose } from "react-icons/cg"; // Import close icon
import productCategory from '../helpers/productCategory'; // Import product categories helper
import { FaCloudUploadAlt } from "react-icons/fa"; // Import upload icon
import uploadImage from '../helpers/uploadImage'; // Import function to upload image to cloud
import DisplayImage from './DisplayImage'; // Component to display full-screen image
import { MdDelete } from "react-icons/md"; // Import delete icon
import SummaryApi from '../common'; // Import API endpoints
import {toast} from 'react-toastify' // Import toast notifications

const AdminEditProduct = ({
    onClose,      // Function to close the edit modal
    productData,  // Product data passed from parent
    fetchdata     // Function to refetch product data after update
}) => {

  // State to hold product data, prefill with existing product info
  const [data,setData] = useState({
    ...productData,
    productName : productData?.productName,
    brandName : productData?.brandName,
    category : productData?.category,
    productImage : productData?.productImage || [],
    description : productData?.description,
    price : productData?.price,
    sellingPrice : productData?.sellingPrice
  })
  
  // State to control full-screen image view
  const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
  const [fullScreenImage,setFullScreenImage] = useState("") // Image URL for full screen
  const [uploading, setUploading] = useState(false) // Loading state during image upload

  // Handle input change for text, number, textarea, select
  const handleOnChange = (e)=>{
      const { name, value} = e.target

      setData((preve)=>{
        return{
          ...preve,      // Keep existing data
          [name]  : value // Update the specific field
        }
      })
  }

  // Handle image upload
  const handleUploadProduct = async(e) => {
    const file = e.target.files[0] // Get the selected file
    
    if(!file){ // Check if file is selected
      toast.error('Please select an image file')
      return
    }

    // Check if the selected file is an image
    if(!file.type.startsWith('image/')){
      toast.error('Please select an image file (JPEG, PNG, etc.)')
      return
    }

    // Check file size (limit: 5MB)
    if(file.size > 5 * 1024 * 1024){
      toast.error('Image size should be less than 5MB')
      return
    }

    setUploading(true) // Set loading state
    
    try {
      const uploadImageCloudinary = await uploadImage(file) // Upload image to cloud
      
      if(uploadImageCloudinary?.url){
        setData((preve)=>{
          return{
            ...preve,
            productImage : [ ...preve.productImage, uploadImageCloudinary.url] // Add uploaded image to product images
          }
        })
        toast.success('Image uploaded successfully')
      } else {
        toast.error('Failed to upload image')
      }
    } catch (error) {
      console.error("Upload error:", error)
      toast.error('Error uploading image')
    } finally {
      setUploading(false) // Reset loading state
      e.target.value = '' // Reset file input to allow same file upload again
    }
  }

  // Delete an image from productImage array
  const handleDeleteProductImage = async(index)=>{
    console.log("image index",index)
    
    const newProductImage = [...data.productImage] // Copy existing images
    newProductImage.splice(index,1) // Remove the image at given index

    setData((preve)=>{
      return{
        ...preve,
        productImage : [...newProductImage] // Update state
      }
    })
  }

  // Handle form submit to update product
  const handleSubmit = async(e) =>{
    e.preventDefault() // Prevent default form submission
    
    // Validate required fields
    if(!data.productName || !data.brandName || !data.category || data.productImage.length === 0 || !data.price || !data.sellingPrice){
      toast.error('Please fill all required fields')
      return
    }

    // Validate selling price is less than original price
    if(parseFloat(data.sellingPrice) >= parseFloat(data.price)){
      toast.error('Selling price should be less than original price')
      return
    }

    try {
      // Call update product API
      const response = await fetch(SummaryApi.updateProduct.url,{
        method : SummaryApi.updateProduct.method,
        credentials : 'include', // Include cookies
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify({
          ...data,
          _id: productData._id // Include product ID to update the correct product
        })
      })

      const responseData = await response.json() // Parse JSON response

      if(responseData.success){
          toast.success(responseData?.message)
          onClose() // Close modal
          fetchdata() // Refresh product data
      } else if(responseData.error){
        toast.error(responseData?.message)
      }

    } catch (error) {
      console.error("Update error:", error)
      toast.error('Failed to update product')
    }
  }

  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
      {/* Modal container */}
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

        {/* Modal header */}
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Edit Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <CgClose/>
          </div>
        </div>

        {/* Form */}
        <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
          {/* Product Name input */}
          <label htmlFor='productName'>Product Name :</label>
          <input 
            type='text' 
            id='productName' 
            placeholder='enter product name' 
            name='productName'
            value={data.productName} 
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          {/* Brand Name input */}
          <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
          <input 
            type='text' 
            id='brandName' 
            placeholder='enter brand name' 
            value={data.brandName} 
            name='brandName'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          {/* Category dropdown */}
          <label htmlFor='category' className='mt-3'>Category :</label>
          <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
            <option value={""}>Select Category</option>
            {
              productCategory.map((el,index)=>{
                return(
                  <option value={el.value} key={el.value+index}>{el.label}</option>
                )
              })
            }
          </select>

          {/* Product Image upload */}
          <label htmlFor='productImage' className='mt-3'>Product Image :</label>
          <label htmlFor='uploadImageInput'>
            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer hover:bg-slate-200 transition-colors'>
              <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                {uploading ? (
                  <div className='flex flex-col items-center'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-red-600'></div>
                    <p className='text-sm mt-2'>Uploading...</p>
                  </div>
                ) : (
                  <>
                    <span className='text-4xl'><FaCloudUploadAlt/></span>
                    <p className='text-sm'>Upload Product Image</p>
                    <p className='text-xs text-slate-400'>Click to add more images</p>
                  </>
                )}
                <input 
                  type='file' 
                  id='uploadImageInput' 
                  className='hidden' 
                  onChange={handleUploadProduct}
                  accept='image/*'
                  disabled={uploading}
                />
              </div>
            </div>
          </label> 
          
          {/* Display uploaded images with delete option */}
          <div className='mt-2'>
            {data?.productImage?.length > 0 ? (
              <div className='flex items-center gap-2 flex-wrap'>
                {data.productImage.map((el,index)=>{
                  return(
                    <div className='relative group' key={index}>
                      <img 
                        src={el} 
                        alt={`Product ${index + 1}`} 
                        width={80} 
                        height={80}  
                        className='bg-slate-100 border cursor-pointer object-cover rounded'  
                        onClick={()=>{
                          setOpenFullScreenImage(true)
                          setFullScreenImage(el)
                        }}
                      />
                      <div 
                        className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' 
                        onClick={()=>handleDeleteProductImage(index)}
                      >
                        <MdDelete/>  
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className='text-red-600 text-xs'>*Please upload at least one product image</p>
            )}
          </div>

          {/* Price input */}
          <label htmlFor='price' className='mt-3'>Price :</label>
          <input 
            type='number' 
            id='price' 
            placeholder='enter price' 
            value={data.price} 
            name='price'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            min="0"
            step="0.01"
            required
          />

          {/* Selling Price input */}
          <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
          <input 
            type='number' 
            id='sellingPrice' 
            placeholder='enter selling price' 
            value={data.sellingPrice} 
            name='sellingPrice'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            min="0"
            step="0.01"
            required
          />

          {/* Description textarea */}
          <label htmlFor='description' className='mt-3'>Description :</label>
          <textarea 
            className='h-28 bg-slate-100 border resize-none p-2 rounded' 
            placeholder='enter product description' 
            rows={3} 
            onChange={handleOnChange} 
            name='description'
            value={data.description}
          />

          {/* Submit button */}
          <button 
            type='submit' 
            className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700 rounded transition-colors mt-4'
            disabled={uploading}
          >
            {uploading ? 'Updating...' : 'Update Product'}
          </button>
        </form> 
      </div>

      {/* Display full-screen image */}
      {openFullScreenImage && (
        <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
      )}
    </div>
  )
}

export default AdminEditProduct
