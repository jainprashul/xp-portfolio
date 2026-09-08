// Analytics API utility to fetch visitor statistics
// Using a Vercel Function to handle API calls

interface VisitorData {
  ip: string;
  country: string;
  country_name: string;
  city: string;
  region: string;
  visits?: number; // This would typically come from your own backend
  lastVisit?: string; // This would typically come from your own backend
  timestamp?: string;
}

// For demo purposes - in a real app, this would be stored in a database
let cachedVisits = parseInt(localStorage.getItem('portfolio_visits') || '0');

// Initialize with visits counter
const incrementVisits = (): number => {
  cachedVisits += 1;
  localStorage.setItem('portfolio_visits', cachedVisits.toString());
  return cachedVisits;
};

// Fetch visitor data using the Vercel Function
export const fetchVisitorData = async (): Promise<VisitorData> => {
  try {
    // Call our Vercel Function endpoint instead of the external API directly
    const response = await fetch('/api/visitor-analytics');
    
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    
    const data = await response.json();
    
    // Add visit counter (still using localStorage for demo purposes)
    const visits = incrementVisits();
    const lastVisit = new Date().toISOString();
    
    return {
      ...data,
      visits,
      lastVisit,
    };
  } catch (error) {
    console.error('Error fetching visitor data:', error);
    return {
      ip: 'Unknown',
      country: 'Unknown',
      country_name: 'Unknown',
      city: 'Unknown',
      region: 'Unknown',
      visits: incrementVisits(),
      lastVisit: new Date().toISOString(),
    };
  }
}; 