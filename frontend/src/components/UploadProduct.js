// Import React library and useState hook to manage component state
import React, { useState } from 'react' 

// Import Close icon from react-icons
import { CgClose } from "react-icons/cg"; 

// Import product categories from helper file
import productCategory from '../helpers/productCategory';

// Import cloud upload icon from react-icons
import { FaCloudUploadAlt } from "react-icons/fa";

// Import helper function to upload image
import uploadImage from '../helpers/uploadImage';

// Import component to display image in full screen
import DisplayImage from './DisplayImage';

// Import Delete icon from react-icons
import { MdDelete } from "react-icons/md";

// Import API URL and methods from common file
import SummaryApi from '../common';

// Import toast for notifications
import {toast} from 'react-toastify'

// UploadProduct component starts here
const UploadProduct = ({
    onClose, // function to close modal
    fetchData // function to refresh product list
}) => {
  // State to store product data
  const [data,setData] = useState({
    productName : "",      // product name input
    brandName : "",        // brand name input
    category : "",         // selected category
    productImage : [],     // array of uploaded image URLs
    description : "",      // product description
    price : "",            // original price
    sellingPrice : ""      // selling price
  })

  // State to check if full screen image modal is open
  const [openFullScreenImage,setOpenFullScreenImage] = useState(false)

  // State to store which image to show in full screen
  const [fullScreenImage,setFullScreenImage] = useState("")

  // State to check if image is uploading
  const [uploading, setUploading] = useState(false)

  // Handle change for input fields
  const handleOnChange = (e)=>{
      const { name, value} = e.target
      // Update the corresponding field in data state
      setData((preve)=>{
        return{
          ...preve,
          [name]  : value
        }
      })
  }

  // Handle image upload
  const handleUploadProduct = async(e) => {
    const file = e.target.files[0] // get selected file
    
    // Check if file is selected
    if (!file) {
      toast.error('Please select a file')
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPEG, PNG, WebP, GIF)')
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size too large. Maximum 5MB allowed')
      return;
    }

    // If already uploading, do nothing
    if (uploading) return;

    setUploading(true) // set uploading state true
    try {
      console.log('Starting upload...', file.name)
      // Call helper function to upload image
      const uploadImageCloudinary = await uploadImage(file)
      console.log('Upload response:', uploadImageCloudinary)

      // If upload successful and URL returned
      if (uploadImageCloudinary && uploadImageCloudinary.url) {
        // Add uploaded image URL to productImage array
        setData((preve)=>{
          return{
            ...preve,
            productImage : [ ...preve.productImage, uploadImageCloudinary.url]
          }
        })
        toast.success('Image uploaded successfully!')
      } else {
        toast.error('Failed to upload image - no URL returned')
      }
    } catch (error) {
      console.error('Upload error:', error)
      
      // Show error message based on error type
      if (error.message.includes('Upload preset')) {
        toast.error('Upload configuration error. Please contact support.')
      } else if (error.message.includes('400')) {
        toast.error('Invalid image file. Please try another image.')
      } else if (error.message.includes('413')) {
        toast.error('File too large. Please select a smaller image.')
      } else if (error.message.includes('Network Error')) {
        toast.error('Network error. Please check your connection.')
      } else {
        toast.error('Error uploading image: ' + error.message)
      }
    } finally {
      setUploading(false) // reset uploading state
      e.target.value = ''; // reset file input
    }
  }

  // Delete product image by index
  const handleDeleteProductImage = async(index)=>{
    console.log("Deleting image index", index)
    const newProductImage = [...data.productImage] // copy existing images
    newProductImage.splice(index,1) // remove selected image

    // Update state with new image array
    setData((preve)=>{
      return{
        ...preve,
        productImage : [...newProductImage]
      }
    })
    toast.success('Image removed') // show success message
  }

  /** Handle product submit */
  const handleSubmit = async(e) =>{
    e.preventDefault() // prevent page reload
    
    // Validate required fields
    if (data.productImage.length === 0) {
      toast.error('Please upload at least one product image')
      return
    }

    if (!data.productName.trim()) {
      toast.error('Please enter product name')
      return
    }

    if (!data.brandName.trim()) {
      toast.error('Please enter brand name')
      return
    }

    if (!data.category) {
      toast.error('Please select a category')
      return
    }

    if (parseFloat(data.sellingPrice) > parseFloat(data.price)) {
      toast.error('Selling price cannot be greater than original price')
      return
    }

    if (parseFloat(data.price) <= 0 || parseFloat(data.sellingPrice) <= 0) {
      toast.error('Price must be greater than 0')
      return
    }

    if (!data.description.trim()) {
      toast.error('Please enter product description')
      return
    }

    try {
      // Send product data to backend API
      const response = await fetch(SummaryApi.uploadProduct.url,{
        method : SummaryApi.uploadProduct.method,
        credentials : 'include', // send cookies
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data) // send product data as JSON
      })

      const responseData = await response.json() // parse response

      // Show success or error message
      if(responseData.success){
          toast.success(responseData?.message || 'Product uploaded successfully!')
          onClose() // close modal
          fetchData() // refresh product list
      } else if(responseData.error){
        toast.error(responseData?.message || 'Failed to upload product')
      }
    } catch (error) {
      console.error('Submit error:', error)
      toast.error('Failed to upload product: ' + (error.message || 'Network error'))
    }
  }

  // Calculate discount percentage
  const calculateDiscount = () => {
    if (data.price && data.sellingPrice && parseFloat(data.price) > 0) {
      return ((1 - parseFloat(data.sellingPrice) / parseFloat(data.price)) * 100).toFixed(1)
    }
    return 0
  }

  // Check if form is valid for submit
  const isFormValid = () => {
    return (
      data.productName.trim() &&
      data.brandName.trim() &&
      data.category &&
      data.productImage.length > 0 &&
      data.description.trim() &&
      data.price &&
      data.sellingPrice &&
      parseFloat(data.price) > 0 &&
      parseFloat(data.sellingPrice) > 0 &&
      parseFloat(data.sellingPrice) <= parseFloat(data.price)
    )
  }

  return (
    // Overlay background
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center z-40'>
       {/* Modal container */}
       <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden shadow-xl'>

            {/* Header */}
            <div className='flex justify-between items-center pb-3 border-b'>
                <h2 className='font-bold text-lg text-gray-800'>Upload New Product</h2>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer transition-colors' onClick={onClose}>
                    <CgClose/>
                </div>
            </div>

          {/* Form start */}
          <form className='grid p-4 gap-3 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
            {/* Product Name */}
            <div>
              <label htmlFor='productName' className='font-medium text-gray-700'>Product Name *</label>
              <input 
                type='text' 
                id='productName' 
                placeholder='Enter product name' 
                name='productName'
                value={data.productName} 
                onChange={handleOnChange} // call handleOnChange on input
                className='p-2 bg-slate-100 border rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500 mt-1'
                required
              />
            </div>

            {/* Brand Name */}
            <div>
              <label htmlFor='brandName' className='font-medium text-gray-700'>Brand Name *</label>
              <input 
                type='text' 
                id='brandName' 
                placeholder='Enter brand name' 
                value={data.brandName} 
                name='brandName'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500 mt-1'
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor='category' className='font-medium text-gray-700'>Category *</label>
              <select 
                required 
                value={data.category} 
                name='category' 
                onChange={handleOnChange} 
                className='p-2 bg-slate-100 border rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500 mt-1'
              >
                  <option value={""}>Select Category</option>
                  {
                    productCategory.map((el)=>{
                      return(
                        <option value={el.value} key={el.id}>{el.label}</option>
                      )
                    })
                  }
              </select>
            </div>

            {/* Product Image Upload */}
            <div>
              <label htmlFor='productImage' className='font-medium text-gray-700'>Product Images *</label>
              <label htmlFor='uploadImageInput'>
                <div className={`p-2 bg-slate-100 border-2 border-dashed rounded h-32 w-full flex justify-center items-center mt-1 transition-all ${
                  uploading ? 'opacity-50 cursor-not-allowed border-gray-400' : 'cursor-pointer hover:bg-slate-200 hover:border-red-300 border-gray-300'
                }`}>
                  <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                    {uploading ? (
                      <>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                        <p className='text-sm'>Uploading Image...</p>
                      </>
                    ) : (
                      <>
                        <span className='text-4xl text-red-500'><FaCloudUploadAlt/></span>
                        <p className='text-sm font-medium'>Click to Upload Product Image</p>
                        <p className='text-xs text-slate-400'>Supports: JPEG, PNG, WebP, GIF • Max: 5MB</p>
                      </>
                    )}
                    <input 
                      type='file' 
                      id='uploadImageInput' 
                      className='hidden' // here choice file i use hidden than why it will not show 
                      onChange={handleUploadProduct} // call image upload function
                      accept="image/jpeg, image/jpg, image/png, image/webp, image/gif"
                      disabled={uploading} // disable input when uploading
                    />
                  </div>
                </div>
              </label> 

              {/* Image Preview */}
              <div className='min-h-20 mt-3'>
                {
                  data?.productImage[0] ? (
                    <div className='flex items-center gap-3 flex-wrap'>
                      {data.productImage.map((el,index) => (
                        <div className='relative group' key={index}>
                          <img 
                            src={el} 
                            alt={`Product ${index + 1}`} 
                            width={80} 
                            height={80}  
                            className='bg-slate-100 border cursor-pointer object-cover rounded-lg hover:opacity-80 transition-all shadow-sm'  
                            onClick={()=>{
                              setOpenFullScreenImage(true) // open full screen
                              setFullScreenImage(el) // set image URL
                            }}
                          />
                          <div 
                            className='absolute -top-2 -right-2 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer hover:bg-red-700 transition-colors' 
                            onClick={() => handleDeleteProductImage(index)} // delete image
                            title="Delete image"
                          >
                            <MdDelete size={14}/>  
                          </div>
                          <div className='absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded'>
                            {index + 1} {/* image index */}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className='text-red-600 text-xs mt-2'>* Please upload at least one product image</p>
                  )
                }
              </div>
            </div>

            {/* Prices */}
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label htmlFor='price' className='font-medium text-gray-700'>Original Price *</label>
                <input 
                  type='number' 
                  id='price' 
                  placeholder='0.00' 
                  value={data.price} 
                  name='price'
                  onChange={handleOnChange} // handle price change
                  className='p-2 bg-slate-100 border rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500 mt-1'
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label htmlFor='sellingPrice' className='font-medium text-gray-700'>Selling Price *</label>
                <input 
                  type='number' 
                  id='sellingPrice' 
                  placeholder='0.00' 
                  value={data.sellingPrice} 
                  name='sellingPrice'
                  onChange={handleOnChange} // handle selling price change
                  className='p-2 bg-slate-100 border rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500 mt-1'
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Discount Display */}
            {data.price && data.sellingPrice && parseFloat(data.price) > 0 && (
              <div className={`text-sm font-medium p-2 rounded ${
                parseFloat(data.sellingPrice) > parseFloat(data.price) 
                  ? 'text-red-600 bg-red-50 border border-red-200' 
                  : 'text-green-600 bg-green-50 border border-green-200'
              }`}>
                {parseFloat(data.sellingPrice) > parseFloat(data.price) 
                  ? ' Selling price cannot be higher than original price' 
                  : ` You're offering ${calculateDiscount()}% discount`
                }
              </div>
            )}

            {/* Description */}
            <div>
              <label htmlFor='description' className='font-medium text-gray-700'>Description *</label>
              <textarea 
                className='h-28 bg-slate-100 border resize-none p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500 mt-1' 
                placeholder='Enter detailed product description...' 
                rows={3} 
                onChange={handleOnChange} // handle description change
                name='description'
                value={data.description}
                required
              />
            </div>

            {/* Submit Button */}
            <button 
              type='submit' 
              className='px-3 py-3 bg-red-600 text-white mb-5 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed rounded font-medium transition-colors mt-2 shadow-md hover:shadow-lg'
              disabled={!isFormValid() || uploading} // disable if form invalid or uploading
            >
              {uploading ? 'Uploading Product...' : 'Upload Product'}
            </button>
          </form> 
       </div>

       {/* Display image full screen if openFullScreenImage true */}
       {
        openFullScreenImage && (
          <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
        )
       }
    </div>
  )
}

// Export component to use in other files
export default UploadProduct
