//ENVIO DE MENSAJES A LOS USUARIOS
import nodemailer from 'nodemailer';
//////////////////////////////////////////

//RUTA DE NUEVA CONTRASEÑA
const ruta = process.env.URL_RECOVER_PASS;


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
	//Contenido y diseño del mensaje
	const contentHtml = `<body>
	<table style="border-collapse:collapse;table-layout:fixed;min-width:320px;width:100%;background-color:#f1f3fc" role="presentation" cellspacing="0" cellpadding="0">
		<tbody>
			<tr>
				<td>
					<div>
						<div style="Margin:0 auto;max-width:600px;min-width:320px;width:320px;width:calc(28000% - 167400px);word-wrap:break-word;word-break:break-word">
							<div style="border-collapse:collapse;display:table;width:100%;background-color:#f1f3fc">
								<div style="text-align:left;color:#8e8e8e;font-size:14px;line-height:21px;font-family:sans-serif">
									<div style="margin-left:30px;margin-right:30px;Margin-top:24px;Margin-bottom:24px">
										<div style="line-height:8px;font-size:1px">
											&nbsp;
										</div>
									</div>
									<p style="height:2px;background-color:#21b36c;border:0;line-height:1px;font-size:0;padding:0;width:100%;margin-top:0">
										&nbsp;
									</p>
								</div>
							</div>
						</div>
						<div style="Margin:0 auto;max-width:600px;min-width:320px;width:320px;width:calc(28000% - 167400px);word-wrap:break-word;word-break:break-word">
							<div style="max-width:600px;border-collapse:collapse;display:table;height:20px;background-color:#fff;border:0;line-height:20px;font-size:0;padding:0;width:100%;margin-top:0">
								&nbsp;
							</div>
							<div style="padding-top:20px;border-collapse:collapse;display:table;width:100%;background-color:#fff">
								<!-- <div style="text-align:left;color:#8e8e8e;font-size:14px;line-height:21px;font-family:Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;float:right;max-width:320px;min-width:100px;width:320px;width:calc(72200px - 12000%)">
									<div style="margin-left:30px;margin-right:30px;Margin-top:0;Margin-bottom:0">
										<div style="font-size:12px;font-style:normal;font-weight:400;line-height:19px">
											<img style="border:0;display:block;height:auto;max-width:42px" alt="" src="https://ci5.googleusercontent.com/proxy/NM2Z7z1IirVeHD1Rtlj5wKMwPAVq3TQ0FD0gWo-lRPv2XmDkn8yeKlspJS31rtHX1yZtjv24w0DElA=s0-d-e1-ft#http://static.trovo.live/logo_trovo.png" width="42" height="51">
										</div>
									</div>
								</div> -->
								<div style="text-align:left;color:#8e8e8e;font-size:14px;line-height:21px;font-family:Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;max-width:400px;min-width:320px;width:320px;width:calc(8000% - 47600px)"><!--float:right PARA COLOCARLO FLOTANTE-->
									<div style="margin-left:30px;margin-right:30px;Margin-top:13px;Margin-bottom:13px">
										<div style="vertical-align:middle">
											<p style="Margin-top:0;Margin-bottom:0;font-size:24px;line-height:28px" lang="x-size-24">
												<strong>
													<span style="color:#000">
														Password Recovery
													</span>
												</strong>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div style="Margin:0 auto;max-width:600px;min-width:320px;width:320px;width:calc(28000% - 167400px);word-wrap:break-word;word-break:break-word">
							<div style="border-collapse:collapse;display:table;width:100%;background-color:#fff">
								<div style="text-align:left;color:#8e8e8e;font-size:14px;line-height:21px;font-family:Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif">
									<div style="margin-left:30px;margin-right:30px;Margin-top:10px">
										<div style="vertical-align:middle">
											<h1 style="Margin-top:0;Margin-bottom:20px;font-style:normal;font-weight:400;color:#808a99;font-size:16px;line-height:24px;font-family:Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;text-align:left" lang="x-size-16">
												<strong>
													<span style="color:#21b36c">Hi
													</span>
												</strong>
											</h1>
										</div>
									</div>
									<div style="margin-left:30px;margin-right:30px">
										<div style="vertical-align:middle">
											<p style="Margin-top:0;Margin-bottom:5px;font-size:16px;line-height:24px" lang="x-size-16">
												<span style="color:#000">
													Here is your TuGuiaQuindio verification code:
												</span>
											</p>
										</div>
									</div>
									<div style="margin-left:30px;margin-right:30px">
										<div style="vertical-align:middle">
											<p style="Margin-top:0;Margin-bottom:5px;font-size:36px;line-height:43px" lang="x-size-36">
												<span style="color:#000">
													<strong>
														${code}
													</strong>
												</span>
											</p>
										</div>
									</div>
									<div style="margin-left:30px;margin-right:30px">
										<div style="vertical-align:middle;font-family:Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif">
											<p style="Margin-top:0;Margin-bottom:30px;font-size:16px;line-height:24px">
												<!-- <span style="color:#000">*This code will expire in 10 minutes, please verify soon</span> -->
												<ul>
													<li>
														This code will expire in 10 minutes, please verify soon
													</li>
												</ul>
											</p>
										</div>
									</div>
									<div style="margin-left:30px;">
										<a href="${ruta}" style="font-size: 1rem; font-weight: 600;">Recovery Password</a>
									</div>
									<div style="margin-left:30px;margin-right:30px; padding-top: 3rem;">
									</div>
									<div style="margin-left:30px;margin-right:30px">
										<p style="height:1px;background-color:#e5e5e5;border:0;line-height:1px;font-size:0;padding:0;width:100%;margin-top:0">
											&nbsp;
										</p>
									</div>
									<div style="margin-left:30px;margin-right:30px;Margin-bottom:20px">
										<div style="vertical-align:middle">
											<p style="Margin-bottom:0;font-size:12px;line-height:18px" lang="x-size-12">@2022 TuGuiaQuindio. All rights reserved.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					<div style="Margin:0 auto;max-width:600px;min-width:320px;width:320px;width:calc(28000% - 167400px);word-wrap:break-word;word-break:break-word">
						<p style="height:2px;background-color:#21b36c;border:0;line-height:1px;font-size:0;padding:0;width:100%;margin-top:0">
							&nbsp;
						</p>
						<div style="border-collapse:collapse;display:table;width:100%;background-color:#f1f3fc">
							<div style="text-align:left;color:#8e8e8e;font-size:14px;line-height:21px;font-family:sans-serif">
								<div style="margin-left:30px;margin-right:30px;Margin-top:24px;Margin-bottom:24px">
									<div style="line-height:8px;font-size:1px">
										&nbsp;
									</div>
								</div>
							</div>
						</div>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</body>`;
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