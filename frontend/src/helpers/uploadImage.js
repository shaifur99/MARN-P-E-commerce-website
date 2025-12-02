// This function uploads an image file to Cloudinary
const uploadImage = async (file) => {
  try {
    // Create a new FormData object to send file data
    const formData = new FormData();

    // Add the image file to FormData with key 'file'
    formData.append('file', file);

    // Add Cloudinary upload preset (pre-configured setting)
    formData.append('upload_preset', 'ecommerce_products');

    // Add Cloudinary API key for authentication
    formData.append('api_key', '938431827896424');
    
    // Send the file to Cloudinary using fetch API
    const response = await fetch('https://api.cloudinary.com/v1_1/dh9lpnqcg/image/upload', {
      method: 'POST',      // Use POST method to upload file
      body: formData       // Attach the form data (file + other info)
    });
    
    // Check if upload failed based on response status
    if (!response.ok) {
      // Convert error response to JSON to read error message
      const errorData = await response.json();

      // Throw custom error message or fallback message
      throw new Error(errorData.error.message || `Upload failed: ${response.status}`);
    }
    
    // Convert successful Cloudinary response to JSON
    const data = await response.json();

    // Log success message and returned data in console
    console.log('Cloudinary upload successful:', data);
    
    // Return the uploaded image data (URL, public_id, etc.)
    return data;

  } catch (error) {
    // Log the error in console
    console.error('Upload error:', error);

    // Throw error again with custom message so the calling function knows about the failure
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

// Export the uploadImage function so it can be used in other files
export default uploadImage;
