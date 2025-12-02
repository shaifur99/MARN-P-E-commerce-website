// ./DisplayImage.js
import React from 'react'; // Import React
import { CgClose } from "react-icons/cg"; // Import close icon from react-icons

// DisplayImage component: shows a full-screen preview of an image
const DisplayImage = ({ onClose, imgUrl }) => {
  return (
    // Full screen overlay
    <div className='fixed w-full h-full bg-black bg-opacity-90 top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
      
      <div className='relative max-w-4xl max-h-full'>
        {/* Close Button */}
        <div 
          className='absolute -top-10 right-0 text-white text-3xl hover:text-red-500 cursor-pointer z-10'
          onClick={onClose} // Call onClose function when clicked
        >
          <CgClose /> {/* Close icon */}
        </div>
        
        {/* Image container */}
        <div className='flex justify-center items-center h-full'>
          <img 
            src={imgUrl} // Image URL passed as prop
            alt="Full screen preview" // Alt text for accessibility
            className='max-w-full max-h-[90vh] object-contain rounded-lg' // Scale image properly and round corners
          />
        </div>
        
        {/* Click outside to close the modal */}
        <div 
          className='absolute inset-0 -z-10' // Full container behind image
          onClick={onClose} // Call onClose if clicked outside image
        ></div>
      </div>
    </div>
  );
};

export default DisplayImage; // Export component
