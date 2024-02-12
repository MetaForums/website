import { dev } from '$app/environment';

export const baseApiUrl = dev ? 
  'http://localhost:3000' :
  'https://api-production-06f4.up.railway.app';