const express = require ('express');// Activamos el framework express
const routes = require ('./routes');// Importamos las rutas
const path = require('path'); // Importamos path
const bodyParser = require('body-parser');  
const helpers = require('./helpers');// añadiendo helpers
const db = require('./config/db');//Crear la conexion a la BD
const expressValidator = require ('express-validator');
const flash = require ('connect-flash');
const session = require ('express-session');
const cookieParser = require ('cookie-parser');
const passport = require ('./config/passport');
require('dotenv').config({path: 'variables.env'});
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');
db.sync().then(()=>console.log('conectado')).catch(error=> console.log(error));
const app = express(); // Inicializamos aplicacion express
app.use(express.static('public'));//añade carpeta a tu proyecto para cargar archivos estaticos
app.set('view engine','pug');// Activamos el template engine PUG
app.use(bodyParser.urlencoded({extended: true})); //habilitando bodyparser para leeer los datos del formulario
app.set('views',path.join(__dirname,'./views'));// Leemos la ruta de las vistas gracias a Path
app.use(flash());
app.use(cookieParser());
app.use(session({
    secret:'supersecreto',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use((req,res,next)=>{
    res.locals.vardump=helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario ={...req.user} || null;
    next();
});
app.use('/',routes()); //Direccionamos las rutas
// app.listen(3000); // Activamos el servidor 

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port,host);