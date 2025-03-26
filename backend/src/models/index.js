// backend/src/models/index.js

require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Подключаем модель User
db.User = require('./User')(sequelize, Sequelize);

// В дальнейшем: db.Profile = require('./Profile')(...);

module.exports = db;
