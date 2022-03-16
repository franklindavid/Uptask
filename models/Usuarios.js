const sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos');

const bcrypt = require('bcrypt');

const Usuarios = db.define('usuarios',{
    id:{
        type: sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: sequelize.STRING(60),
        allowNull:false,
        validate:{
            isEmail:{
                msg: 'Agrega un Correo Valido'
            },
            notEmpty:{
                msg: 'El Email no puede estar Vacio'
            }
        },
        unique:{
            args:true,
            msg: 'Usuario Ya registrado'
        }
    },
    password: {
        type: sequelize.STRING(60) ,
        allowNull:false,
        validate:{
            notEmpty:{
                msg: 'El Password no puede estar Vacio'
            }
        }
    } ,
    activo:{
        type: sequelize.INTEGER(1),
        defaultValue: 0
    },
    token:{
        type: sequelize.STRING(60) ,
    },
    expiracion:{
        type: sequelize.DATE,
    }
},{
    hooks:{
        beforeCreate(usuario){
            usuario.password = bcrypt.hashSync(usuario.password,bcrypt.genSaltSync(10));
        }
    }
    
});
Usuarios.prototype.verificarPassword= function(password){
    return bcrypt.compareSync(password,this.password)
}

Usuarios.hasMany(Proyectos);
// Tareas.belongsTo(Proyectos);

module.exports = Usuarios;