// Import SummaryApi object from ../common file
const { default: SummaryApi } = require("../common")

// Create an async function to fetch products based on category
const fetchCategoryWiseProduct = async(category)=>{

    // Send API request using fetch function
    const response = await fetch(SummaryApi.categoryWiseProduct.url,{
        method : SummaryApi.categoryWiseProduct.method, // Set request method (GET/POST)
        headers : {
            "content-type" : "application/json" // Define data type as JSON
        },
        body : JSON.stringify({
            category : category // Send selected category in request body
        })
    })

    // Convert API response to JSON
    const dataResponse = await response.json()

    // Return final data to the function caller
    return dataResponse
}

// Export the function so it can be used in other files
export default fetchCategoryWiseProduct
