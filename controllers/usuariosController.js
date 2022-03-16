const Usuarios =require('../models/Usuarios');
const enviarEmail = require('../handlers/email');

exports.formCrearCuenta = (req,res)=>{
    res.render('crearCuenta',{
        nombrePagina : 'Crear Cuenta en Uptask'
    })
}

exports.formIniciarSesion = (req,res)=>{
    const {error} = res.locals.mensajes;
    res.render('iniciarSesion',{
        nombrePagina : 'Iniciar Sesion en Uptask',
        error : error
    })
}

exports.crearCuenta = async (req,res)=>{
    const {email,password} = req.body;

    try{
        await Usuarios.create({
            email,
            password
        });
        //
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;
        const usuario = {
            email
        }
        await enviarEmail.enviar({
            usuario,
            subject : 'Confirma tu cuenta Uptask',
            confirmarUrl,
            archivo: 'confirmar-cuenta'
        });
        req.flash('correcto','Enviamos un correo, confirma tu cuenta');   
        //
        res.redirect('/iniciar-sesion');

    }catch(error){
        console.log(error);
        req.flash('error',error.errors.map(error=>error.message))
        res.render('crearCUenta',{
            mensajes: req.flash(),
            nombrePagina : 'Crear Cuenta en Uptask',
            email,
            password
        })
    }
}

exports.formRestablecerPassword = (req,res)=>{
    res.render('reestablecer',{
        nombrePagina: 'Reestablecer tu contraseña'
    })
}

exports.confirmarCuenta = async (req,res)=>{
    const usuario = await Usuarios.findOne({
        where:{
            email:req.params.correo
        }
    });

    if(!usuario){
        req.flash('error','No valido');
        res.redirect('/crear-cuenta');
    }else{
        usuario.activo=1;
        await usuario.save();
        req.flash('correcto','Cuenta activada correctamente');
        res.redirect('/iniciar-sesion');
    }


}
