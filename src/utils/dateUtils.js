export const formatDate = (isoDateString) =>{
    // Convert the ISO date string to a JavaScript Date object
    const date = new Date(isoDateString);
  
    // Get individual date components
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'long' }); // Full month name
    const day = date.getDate();
  
    // Construct the formatted date string
    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
}