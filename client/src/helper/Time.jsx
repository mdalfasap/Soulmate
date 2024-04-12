export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const currentDate = new Date();
    
    // Check if the date is today
    if (date.toDateString() === currentDate.toDateString()) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `Today ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }

    // Get yesterday's date
    const yesterdayDate = new Date(currentDate);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);

    // Check if the date is yesterday
    if (date.toDateString() === yesterdayDate.toDateString()) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `Yesterday ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }

    // Format the time
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;

    // Format the date
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month starts from 0
    const year = date.getFullYear();
    const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}`;
  
    // Get current year
    const currentYear = currentDate.getFullYear();
  
    // Check if the year of the timestamp is the current year
    const formattedYear = year !== currentYear ? `-${year}` : '';
  
    // Combine time and date
    const formattedTimestamp = `${formattedTime} ${formattedDate}${formattedYear}`;
  
    return formattedTimestamp;
};
