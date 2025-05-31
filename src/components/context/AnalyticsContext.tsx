import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchVisitorData } from '../../utils/analyticsAPI';

// Define the shape of our analytics data
interface VisitorData {
  ip: string;
  country: string;
  country_name: string;
  city: string;
  region: string;
  visits?: number;
  lastVisit?: string;
}

// Define the shape of our context
interface AnalyticsContextType {
  visitorData: VisitorData | null;
  loading: boolean;
  error: string | null;
}

// Create the context with default values
const AnalyticsContext = createContext<AnalyticsContextType>({
  visitorData: null,
  loading: true,
  error: null,
});

// Create a provider component
type Props = {
  children: React.ReactNode;
};

export const AnalyticsProvider: React.FC<Props> = ({ children }) => {
  const [visitorData, setVisitorData] = useState<VisitorData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getVisitorData = async () => {
      try {
        setLoading(true);
        const data = await fetchVisitorData();
        setVisitorData(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch visitor data');
        console.error('Error in analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    getVisitorData();
  }, []);

  return (
    <AnalyticsContext.Provider value={{ visitorData, loading, error }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// Create a custom hook for using the analytics context
export const useAnalytics = () => useContext(AnalyticsContext);

export default AnalyticsProvider; 