require('dotenv').config()

const { 
  DB_HOST, DB_NAME, DB_DIALECT, DB_USERNAME, DB_PASSWORD,
  DB_HOST_PRODUCTION, DB_NAME_PRODUCTION, DB_DIALECT_PRODUCTION, 
  DB_USERNAME_PRODUCTION, DB_PASSWORD_PRODUCTION 
} = process.env

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": DB_DIALECT
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": DB_DIALECT
  },
  "production": {
    "username": DB_USERNAME_PRODUCTION,
    "password": DB_PASSWORD_PRODUCTION,
    "database": DB_NAME_PRODUCTION,
    "host": DB_HOST_PRODUCTION,
    "dialect": DB_DIALECT_PRODUCTION
  }
}
