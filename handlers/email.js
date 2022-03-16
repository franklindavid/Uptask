const nodemailer=require('nodemailer');
const pug = require ('pug');
const juice = require('juice');
const htmlToText= require('html-to-text');
const util= require('util');
const emailConfig = require('../config/email');

var transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass
    }
  });

const generarHTML = (archivo,opciones={}) =>{
    const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`,opciones);
    return juice(html);
}

exports.enviar = async (opciones) =>{
    const html = generarHTML(opciones.archivo,opciones);
    const text = htmlToText.convert(html);
    let opcionesEmail = {
        from: 'UpTask <no-reply@uptask.com>', // sender address
        to: opciones.usuario.email, // list of receivers
        subject: opciones.subject, // Subject line
        text: "hola", // plain text body
        html, // html body
        text
    };
    const enviarEmail = util.promisify(transport.sendMail,transport);
    return enviarEmail.call(transport,opcionesEmail)
    // transport.sendMail(opcionesEmail);
}