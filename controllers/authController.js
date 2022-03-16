const passport = require ('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');
const sequelize = require('sequelize')
const Op = sequelize.Op
const bcrypt = require('bcrypt');
const enviarEmail = require('../handlers/email');
exports.autenticateUsuario = passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos Campos son Obligatorios'
});

exports.usuarioAutenticado = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/iniciar-sesion');
}


exports.cerrarSesion = (req,res) =>{
    req.session.destroy(()=>{
        res.redirect('/iniciar-sesion');
    })
}

exports.enviarToken = async (req,res)=>{
    const {email} = req.body
    const usuario = await Usuarios.findOne({
        where:{
            email
        }
    });

    if(!usuario){
        req.flash('error','No existe esa cuenta');
        res.redirect('/reestablecer');
    }else{
        usuario.token = crypto.randomBytes(20).toString('hex');    
        usuario.expiracion = Date.now()+3600000;
        await usuario.save();
        const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;
        await enviarEmail.enviar({
            usuario,
            subject : 'Password Reset',
            resetUrl,
            archivo: 'reestablecer-password'
        });
        req.flash('correcto','Se envio un mensaje a tu correo');
        res.redirect ('/iniciar-sesion');
    }   
}

exports.validarToken = async (req,res)=>{
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token
        }
    })
    if(!usuario){
        req.flash('error','No Valido');
        res.redirect ('/reestablecer');
    }else{
        res.render('resetPassword',{
            nombrePagina : 'Reestablecer contraseña'
        });
    }
    
}

exports.actualizarPassword = async (req,res)=>{
    const usuario= await Usuarios.findOne({
        where:{
            token: req.params.token,
            expiracion:{
                [Op.gte] : Date.now()
            }
        }
    });
    if(!usuario){
        req.flash('error','No Valido');
        res.redirect('/reestablecer')
    }else{
        usuario.password = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10));
        usuario.token=null;
        usuario.expiracion=null;
        await usuario.save();
        req.flash('correcto','Tu password se ha modificado correctamente');
        res.redirect('/iniciar-sesion');
    }
}