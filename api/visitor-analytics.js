// Vercel Serverless Function for visitor analytics
// This function proxies requests to ipapi.co and handles visit counting

export default async function handler(request, response) {
  try {
    // Fetch geolocation data from ipapi.co
    const geoResponse = await fetch('https://ipapi.co/json/');
    
    if (!geoResponse.ok) {
      throw new Error('Failed to fetch location data');
    }
    
    const geoData = await geoResponse.json();
    
    // Return the geolocation data
    // In a production app, you would store visit counts in a database
    return response.status(200).json({
      ...geoData,
      // Visit counting would be implemented with a real database in production
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in visitor-analytics function:', error);
    return response.status(500).json({
      error: 'Failed to fetch visitor data',
      message: error.message
    });
  }
} 