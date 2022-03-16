const sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos');

const Tareas = db.define('tareas',{
    id:{
        type: sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    tarea: sequelize.STRING(100),
    estado: sequelize.INTEGER(1)    
},{
    hooks:{
        
    }
    
});
Tareas.belongsTo(Proyectos);

module.exports = Tareas;