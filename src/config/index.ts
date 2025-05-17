import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  fakerApiBaseUrl: process.env.API_BASE_URL || 'https://fakerapi.it/api/v1'
}; 