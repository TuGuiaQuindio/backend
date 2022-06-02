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

	const contentHtml2 = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Send Email</title>
    <style>
        
        :root{
            --margin-left: 1.2rem
        }

        *{
            font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        }

        html{
            background-color: rgb(218, 218, 218);
            width: 50%;
        }

        body,footer{
            background-color: white;
            /*width: 50%;*/
        }

        article{
            /* border: 2px solid red; */
            /* width: 100%; */
            margin-left: var(--margin-left);
            margin-bottom: 5rem;
        }
        footer{
            margin-left: var(--margin-left);
            margin-top: 1.2rem;
            margin-bottom: 1.2rem;
            font-size: 12px;
            color: #A5A0A0;
        }

        .color_verde{
            /* width: 50%; */
            height: 0.2rem;
            background-color: #4DE235;
        }

        .title{
        }

        .p_hi{
            margin-bottom: 2rem;
        }

        .p_code{
            font-size: 2rem;
            margin: 0;
        }
        
        .container_menssage2{
            color: #606060;
        }

        a{
            font-size: 1rem;
            font-weight: 600;
        }
        
        .separador{
            /* width: ; */
            height: 1px;
            background-color: #A5A0A0;
            margin-left: 0.8rem;
        }
    </style>
</head>
<div class="color_verde"></div>
<body>
    <article>
        <div class="title">
            <h1>Password Recovery</h1>
        </div>
        <!-- <div id="logo">
            <img src="" alt="logo">
        </div> -->
        <div class="conteiner_menssage">
            <b><p class="p_hi">Hi</p></b>
            <p>Here is your TuGuiaQuindio verification code:</p>
        </div>
        <div class="conteiner_code">
            <b><p class="p_code">${code}</p></b>
        </div>
        <div class="container_menssage2">
            <ul>
                <li>
                    This code will expire in 10 minutes, please verify soon
                </li>
            </ul>
        </div>
        <div class="container_url">
            <a href="${ruta}">Link to reset password</a>
        </div>
        
    </article>
    <div class="separador">

    </div>
</body>
<footer>
    <p>@2022 TuGuiaQuindio , All rights reserved.</p>
</footer>
<div class="color_verde"></div>
</html>`;
	//Opciones del destino
	const mailOptions = {
		from : 'Tu Guia Quindio',
		to : email,
		subject : 'Recover Password',
		// text : 'Saludo',
		html: contentHtml2
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