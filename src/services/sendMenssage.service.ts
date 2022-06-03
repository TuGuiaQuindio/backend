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
            /* width: 50%; */
        }

        .color_verde{
            /* width: 50%; */
            height: 0.2rem;
            background-color: #7ECA78;
        }

    </style>
</head>
<div style="Margin:0 auto;max-width:600px;min-width:320px;width:320px;width:calc(28000% - 167400px);word-wrap:break-word;word-break:break-word">
    <div style="border-collapse:collapse;display:table;width:100%;background-color:#f1f3fc">
        <div style="text-align:left;color:#8e8e8e;font-size:14px;line-height:21px;font-family:sans-serif">
            <div style="margin-left:30px;margin-right:30px;Margin-top:24px;Margin-bottom:24px">
                <div style="line-height:8px;font-size:1px">&nbsp;
                </div>
            </div>
        </div>
    </div>
</div>
<div class="color_verde"></div>
<body style="max-width:600px;">
    <div style="Margin:0 auto;max-width:600px;min-width:320px;width:320px;width:calc(28000% - 167400px);word-wrap:break-word;word-break:break-word">
        <article style="margin-left: var(--margin-left);margin-bottom: 5rem;">
            <div class="title">
            <h1>Password Recovery</h1>
        </div>
        <!-- <div id="logo">
            <img src="" alt="logo">
        </div> -->
        <div class="conteiner_menssage", style="margin-bottom: 0.5rem;">
            <b><p class="p_hi" style="margin-bottom: 2rem;">Hi</p></b>
            <span>
                Here is your TuGuiaQuindio verification code:
            </span>
        </div>
        <div class="conteiner_code">
            <b><p class="p_code" style="font-size: 2rem; margin: 0;">
                <strong>
                    ${code}
                </strong>
            </p></b>
        </div>
        <div class="container_menssage2" style="color: #606060;">
            <ul>
                <li>
                    This code will expire in 10 minutes, please verify soon
                </li>
            </ul>
        </div>
        <div class="container_url">
            <a href="${ruta}" style="font-size: 1rem; font-weight: 600;">Recovery Password</a>
        </div>
        
    </article>
</div>
    <div style="margin-left:30px;margin-right:30px">
        <p style="height:1px;background-color:#e5e5e5;border:0;line-height:1px;font-size:0;padding:0;width:100%;margin-top:0">&nbsp;</p>
    </div>
</body>
<footer>
    <p>@2022 TuGuiaQuindio , All rights reserved.</p>
</footer style="margin-left: var(--margin-left);margin-top: 1.2rem;margin-bottom: 1.2rem;font-size: 12px;color: #A5A0A0;">
<div class="color_verde"></div>
<div style="Margin:0 auto;max-width:600px;min-width:320px;width:320px;width:calc(28000% - 167400px);word-wrap:break-word;word-break:break-word">
    <div style="border-collapse:collapse;display:table;width:100%;background-color:#f1f3fc">
        <div style="text-align:left;color:#8e8e8e;font-size:14px;line-height:21px;font-family:sans-serif">
            <div style="margin-left:30px;margin-right:30px;Margin-top:24px;Margin-bottom:24px">
                <div style="line-height:8px;font-size:1px">&nbsp;
                </div>
            </div>
        </div>
    </div>
</div>
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