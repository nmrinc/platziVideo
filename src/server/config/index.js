require('dotenv-flow').config();

const config = {
  dev: process.env.ENV !== 'production',
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
};

export default config;
