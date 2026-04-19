/**
 * Centralized API configuration to handle environment-specific base URLs.
 * In development, it defaults to localhost:5001.
 * In production, it uses VITE_API_BASE_URL if provided, otherwise it falls back to a relative path.
 */

const isProd = import.meta.env.MODE === 'production';
const envBaseUrl = import.meta.env.VITE_API_BASE_URL;

// If we are in production and VITE_API_BASE_URL is still pointing to localhost, 
// it means the build was triggered with local settings. 
// We should fallback to the known production URL if provided, otherwise relative path.
const PROD_FALLBACK = 'https://spinfactor-bot-production.up.railway.app';

export const API_BASE_URL = isProd 
  ? (envBaseUrl && !envBaseUrl.includes('localhost') ? envBaseUrl : PROD_FALLBACK)
  : (envBaseUrl || 'http://localhost:5001');

