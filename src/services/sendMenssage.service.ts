//ENVIO DE MENSAJES A LOS USUARIOS
import nodemailer from 'nodemailer';

//RUTA DE NUEVA CONTRASEÑA
const ruta = 'http://localhost:3000/reset-pass';


export const sendEmailRecoveyPass = async ( code : string, email : string) => {
	
	//Se crea el objeto de transporte
	const transporter = nodemailer.createTransport({
		// host: 'smtp.ethereal.email',
		host : 'smtp.gmail.com',
		// host : 'smtppro.zoho.in',
		// host : 'smtp.zoho.com',
		port: 465, // Puerto de seguridad 465
		secure: true,
		auth : {
			//Ethereal
			// user : 'velva.weimann55@ethereal.email',
			// pass : ' QA3U7GPRAEQaS6C9Qa' 
			//Gmail
			user: process.env.MAIL_CREDE,
			pass : process.env.MAIL_PASS
		},
		// tls : {
		// 	rejectUnauthorized : false,
		// }
	});
	
	const contentHtml = `
						<h2>Password recovery</h2><br>
						Here is your TuGuiaQuindio verification code:<br>
						<h2>${code}</h2><br>
						*This code will expire in 10 minutes, please verify soon<br>
						URL: <a href="${ruta}"> Reset Password </a><br><br>
						@2022 TuGuíaQuindío. All rights reserved.
						`;
	//Opciones del destino
	const mailOptions = {
		from : 'Tu Guia Quindio',
		to : email,
		subject : 'Recover Password',
		// text : 'Saludo',
		html: contentHtml
	};
	
	console.log('ENVIANDO EMAIL...');
	
	// enviar correo
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log('ERROR->',error);
		}else{
			console.log('Email enviado: ' + info.response);
		}
	});
};