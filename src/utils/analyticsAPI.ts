// Analytics API utility to fetch visitor statistics
// Prefers the Vercel Function; falls back to client-side lookup in local/dev.

interface VisitorData {
  ip: string;
  country: string;
  country_name: string;
  city: string;
  region: string;
  visits?: number;
  lastVisit?: string;
  timestamp?: string;
}

const VISITS_KEY = 'portfolio_visits';

const getVisitCount = (): number => {
  try {
    return parseInt(localStorage.getItem(VISITS_KEY) || '0', 10) || 0;
  } catch {
    return 0;
  }
};

const incrementVisits = (): number => {
  const next = getVisitCount() + 1;
  try {
    localStorage.setItem(VISITS_KEY, next.toString());
  } catch {
    // Ignore storage failures (private mode, etc.)
  }
  return next;
};

const unknownVisitor = (): VisitorData => ({
  ip: 'Unknown',
  country: 'Unknown',
  country_name: 'Unknown',
  city: 'Unknown',
  region: 'Unknown',
});

const withVisitMeta = (data: VisitorData): VisitorData => ({
  ...data,
  visits: incrementVisits(),
  lastVisit: new Date().toISOString(),
});

const isVisitorPayload = (data: unknown): data is VisitorData => {
  if (!data || typeof data !== 'object') return false;
  const record = data as Record<string, unknown>;
  return typeof record.city === 'string' || typeof record.country === 'string';
};

const fetchFromEndpoint = async (url: string): Promise<VisitorData> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch visitor data (${response.status})`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error(`Expected JSON from ${url}, got ${contentType || 'unknown'}`);
  }

  const data: unknown = await response.json();
  if (!isVisitorPayload(data)) {
    throw new Error('Visitor payload missing location fields');
  }

  return {
    ip: typeof data.ip === 'string' ? data.ip : 'Unknown',
    country: typeof data.country === 'string' ? data.country : 'Unknown',
    country_name:
      typeof data.country_name === 'string' ? data.country_name : 'Unknown',
    city: typeof data.city === 'string' ? data.city : 'Unknown',
    region: typeof data.region === 'string' ? data.region : 'Unknown',
    timestamp: typeof data.timestamp === 'string' ? data.timestamp : undefined,
  };
};

export const fetchVisitorData = async (): Promise<VisitorData> => {
  try {
    const data = await fetchFromEndpoint('/api/visitor-analytics');
    return withVisitMeta(data);
  } catch (primaryError) {
    console.warn('Primary analytics endpoint failed, trying fallback:', primaryError);

    try {
      // Client-side fallback for local Vite (no serverless runtime) and API outages
      const data = await fetchFromEndpoint('https://ipapi.co/json/');
      return withVisitMeta(data);
    } catch (fallbackError) {
      console.error('Error fetching visitor data:', fallbackError);
      return withVisitMeta(unknownVisitor());
    }
  }
};
