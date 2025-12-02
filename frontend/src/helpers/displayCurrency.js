const displayBDTCurrency = (num) => {
    if (!num && num !== 0) return '৳0.00';
    
    // Format number with commas and 2 decimal places
    const formattedNumber = new Intl.NumberFormat('en-BD', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(num);
    
    return `৳${formattedNumber}`;
}

export default displayBDTCurrency;