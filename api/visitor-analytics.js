// Vercel Serverless Function for visitor analytics
// Uses Vercel edge geolocation headers (reliable) instead of a third-party IP API

function decodeHeader(value) {
  if (!value || typeof value !== 'string') return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function countryNameFromCode(code) {
  if (!code || code === 'Unknown') return 'Unknown';
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code;
  } catch {
    return code;
  }
}

function getClientIp(request) {
  const forwarded = request.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers['x-real-ip'] || 'Unknown';
}

export default async function handler(request, response) {
  try {
    const country = decodeHeader(request.headers['x-vercel-ip-country']) || 'Unknown';
    const city = decodeHeader(request.headers['x-vercel-ip-city']) || 'Unknown';
    const region = decodeHeader(request.headers['x-vercel-ip-country-region']) || 'Unknown';

    return response.status(200).json({
      ip: getClientIp(request),
      country,
      country_name: countryNameFromCode(country),
      city,
      region,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in visitor-analytics function:', error);
    return response.status(500).json({
      error: 'Failed to fetch visitor data',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
