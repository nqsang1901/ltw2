const Sequelize = require('sequelize');

<<<<<<< HEAD
const connectionString=process.env.DATABASE_URL || 'postgres://postgres:021199@localhost:5432/doan';
=======
const connectionString=process.env.DATABASE_URL || 'postgres://postgres:190199@localhost:5432/todo';
>>>>>>> 48e08bb8a62e44fd1077db1329e3954bda50dfa7
const db = new Sequelize(connectionString);

module.exports=db;