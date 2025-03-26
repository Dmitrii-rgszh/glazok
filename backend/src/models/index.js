require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,  // glazok_db
  process.env.DB_USER,  // glazok_db_user
  process.env.DB_PASS,  // твой пароль
  {
    host: process.env.DB_HOST,  // dpg-cvi162dsvqrc73cj5h3g-a
    port: process.env.DB_PORT,  // 5432
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = { sequelize };

