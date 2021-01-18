require('dotenv-flow').config();

const config = {
  dev: process.env.ENV !== 'production',
  port: process.env.PORT || 8000,
  apiUrl: process.env.API_URL,
  apiKeyToken: process.env.API_KEY_TOKEN,
  cors: process.env.CORS,
};

export default config;
