import React, { useEffect, useState } from 'react' // Import React and hooks useState, useEffect
import image1 from '../assest/banner/img1.jpg'      // Desktop banner image 1
import image2 from '../assest/banner/img2.jpg'      // Desktop banner image 2
import image3 from '../assest/banner/img3.jpg'      // Desktop banner image 3
import image4 from '../assest/banner/img4.jpg'      // Desktop banner image 4
import image5 from '../assest/banner/img5.png'      // Desktop banner image 5

import image1Mobile from '../assest/banner/img1_mobile.jpg' // Mobile banner image 1
import image2Mobile from '../assest/banner/img2_mobile.jpg' // Mobile banner image 2
import image3Mobile from '../assest/banner/img3_mobile.jpg' // Mobile banner image 3
import image4Mobile from '../assest/banner/img4_mobile.jpg' // Mobile banner image 4
import image5Mobile from '../assest/banner/img5_mobile.webp' // Mobile banner image 5

import { FaAngleRight } from "react-icons/fa6"; // Import right arrow icon
import { FaAngleLeft } from "react-icons/fa6";  // Import left arrow icon

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0) // State to track which image is showing

    // List of desktop images
    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    // List of mobile images
    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]

    // Function to go to next image
    const nextImage = () => {
        if(currentImage < desktopImages.length - 1){
            setCurrentImage(prev => prev + 1) // Move to next image
        } else {
            setCurrentImage(0) // If last image, go back to first
        }
    }

    // Function to go to previous image
    const prevImage = () => {
        if(currentImage !== 0){
            setCurrentImage(prev => prev - 1) // Move to previous image
        } else {
            setCurrentImage(desktopImages.length - 1) // If first image, go to last
        }
    }

    // Auto-slide effect: changes image every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if(currentImage < desktopImages.length - 1){
                setCurrentImage(prev => prev + 1)
            } else {
                setCurrentImage(0)
            }
        }, 5000)

        return () => clearInterval(interval) // Cleanup interval when component unmounts
    }, [currentImage, desktopImages.length])

    return (
        <div className='container mx-auto px-4 rounded-lg mt-4'>
            {/* Banner Container */}
            <div className='relative w-full h-56 md:h-72 lg:h-80 bg-gray-200 rounded-lg overflow-hidden shadow-lg'>
                
                {/* Navigation Buttons for Desktop */}
                <div className='absolute inset-0 z-10 hidden md:flex items-center'>
                    <div className='flex justify-between w-full text-2xl'>
                        <button 
                            onClick={prevImage} // Go to previous image
                            className='bg-white bg-opacity-80 hover:bg-opacity-100 shadow-md rounded-full p-2 transition-all duration-300 hover:scale-110'
                        >
                            <FaAngleLeft className='text-lg'/> {/* Left arrow icon */}
                        </button>
                        <button 
                            onClick={nextImage} // Go to next image
                            className='bg-white bg-opacity-80 hover:bg-opacity-100 shadow-md rounded-full p-2 transition-all duration-300 hover:scale-110'
                        >
                            <FaAngleRight className='text-lg'/> {/* Right arrow icon */}
                        </button> 
                    </div>
                </div>

                {/* Image indicators (dots) */}
                <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2'>
                    {desktopImages.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                currentImage === index 
                                    ? 'bg-white scale-125 shadow-md'  // Active dot
                                    : 'bg-white bg-opacity-50 hover:bg-opacity-75' // Inactive dot
                            }`}
                            onClick={() => setCurrentImage(index)} // Jump to clicked image
                        />
                    ))}
                </div>

                {/* Desktop and Tablet Images */}
                <div className='hidden md:flex h-full w-full'>
                    {desktopImages.map((imageURL, index) => (
                        <div 
                            className='w-full h-full flex-shrink-0 transition-transform duration-500 ease-in-out' 
                            key={index} 
                            style={{ transform: `translateX(-${currentImage * 100}%)` }} // Slide effect
                        >
                            <img 
                                src={imageURL} 
                                className='w-full h-full object-cover'
                                alt={`Banner ${index + 1}`} // Accessibility text
                                loading='lazy' // Lazy load images
                            />
                        </div>
                    ))}
                </div>

                {/* Mobile Images */}
                <div className='flex h-full w-full md:hidden'>
                    {mobileImages.map((imageURL, index) => (
                        <div 
                            className='w-full h-full flex-shrink-0 transition-transform duration-500 ease-in-out' 
                            key={index} 
                            style={{ transform: `translateX(-${currentImage * 100}%)` }} // Slide effect
                        >
                            <img 
                                src={imageURL} 
                                className='w-full h-full object-cover'
                                alt={`Banner ${index + 1}`} // Accessibility text
                                loading='lazy' // Lazy load images
                            />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default BannerProduct
