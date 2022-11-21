require('dotenv').config();

module.exports =
{
  "development": {
    "dialect": process.env.DB_DIALECT,
    "host": process.env.DB_HOST,
    "username": process.env.DB_USER,
    "password": process.env.DB_PWD,
    "database": process.env.DB_NAME,
    "port": process.env.DB_PORT,
    "logging": true
  },
  "test": {
    "dialect": process.env.DB_DIALECT,
    "host": process.env.DB_HOST,
    "username": process.env.DB_USER,
    "password": process.env.DB_PWD,
    "database": process.env.DB_NAME,
    "port": process.env.DB_PORT,
    "logging": true
  },
  "production": {
    "dialect": process.env.DB_DIALECT,
    "host": process.env.DB_HOST,
    "username": process.env.DB_USER,
    "password": process.env.DB_PWD,
    "database": process.env.DB_NAME,
    "port": process.env.DB_PORT,
    "logging": false
  }
}
