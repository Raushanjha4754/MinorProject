const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

module.exports = {
  port: process.env.PORT || 5000,
  mongodb: {
    uri: process.env.MONGODB_URI.replace(
      '<db_password>',
      process.env.DB_PASSWORD
    ),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-here',
    expiresIn: process.env.JWT_EXPIRES_IN || '90d'
  },
  env: process.env.NODE_ENV || 'development'
};