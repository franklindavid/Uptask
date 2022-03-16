const { accepts } = require('express/lib/request');
const { Sequelize } = require('sequelize');
require('dotenv').config({path: 'variables.env'});


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.BD_NOMBRE,process.env.BD_USER, process.env.BD_PASS, {
  host: process.env.BD_HOST,
  dialect: 'mysql' ,
  port: process.env.BD_PORT,
  define: {
      timestamps: false
  }
});

// const sequelize = new Sequelize('uptasknode', 'root', 'root', {
//   host: 'localhost',
//   dialect: 'mysql' ,
//   port: 3306,
//   define: {
//       timestamps: false
//   }
// });

module.exports = sequelize;