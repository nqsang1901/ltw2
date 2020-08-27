const Sequelize = require('sequelize');

<<<<<<< HEAD
const connectionString=process.env.DATABASE_URL || 'postgres://postgres:021199@localhost:5432/doan';
=======
const connectionString=process.env.DATABASE_URL || 'postgres://postgres:daoxuanhoang123@localhost:5432/doan';

>>>>>>> 645a492318c2096a24f19d0c6e15b3f09581ca14
const db = new Sequelize(connectionString);

module.exports=db;