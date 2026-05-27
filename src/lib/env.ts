const productionApiBaseUrl = 'https://xeorum-backend-production.up.railway.app/api/v1';
const developmentApiBaseUrl = 'http://localhost:3001/api/v1';

export const publicEnv = {
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    (process.env.NODE_ENV === 'production' ? productionApiBaseUrl : developmentApiBaseUrl),
};
