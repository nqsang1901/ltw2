const Sequelize = require('sequelize');

const connectionString=process.env.DATABASE_URL || 'postgres://postgres:021199@localhost:5432/DoAn';
const db = new Sequelize(connectionString);

module.exports=db;