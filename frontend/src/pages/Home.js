// Import React library to use JSX and components
import React from 'react'

// Import CategoryList component to show product categories
import CategoryList from '../components/CategoryList'

// Import BannerProduct component to show banner section
import BannerProduct from '../components/BannerProduct'

// Import HorizontalCardProduct to show horizontal product cards
import HorizontalCardProduct from '../components/HorizontalCardProduct'

// Import VerticalCardProduct to show vertical product cards
import VerticalCardProduct from '../components/VerticalCardProduct'

// Home component starts here
const Home = () => {
  return (
    <div> {/* This is the main container */}

      <CategoryList/> {/* Shows the list of categories */}

      <BannerProduct/> {/* Shows the top banner section */}

      {/* Horizontal product section for Airpods */}
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>

      {/* Horizontal product section for Watches */}
      <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>

      {/* Vertical product section for Laptop */}
      <VerticalCardProduct category={"laptop"} heading={"Laptop"}/>

      {/* Vertical product section for Mobiles */}
      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"}/>

      {/* Vertical product section for Mouse */}
      <VerticalCardProduct category={"Mouse"} heading={"Mouse"}/>

      {/* Vertical product section for Televisions */}
      <VerticalCardProduct category={"televisions"} heading={"Televisions"}/>

      {/* Vertical product section for Camera products */}
      <VerticalCardProduct category={"camera"} heading={"Camera & Photography"}/>

      {/* Vertical product section for Wired Earphones */}
      <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"}/>

      {/* Vertical product section for Speakers */}
      <VerticalCardProduct category={"speakers"} heading={"Speakers"}/>

      {/* Vertical product section for Printers */}
      <VerticalCardProduct category={"printers"} heading={"Printer"}/>

      {/* Vertical product section for Processor */}
      <VerticalCardProduct category={"processor"} heading={"Processor"}/>

      {/* Vertical product section for Refrigerator */}
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>

      {/* Vertical product section for Trimmers */}
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>

    </div>
  )
}

// Export Home component for use in other files
export default Home
