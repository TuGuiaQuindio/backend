//Controlador de recuperar contraseña - GUIA / EMPRESA
import { Request, Response } from 'express';


////////////////////////////////////////////////
//IMPORTAMOS SERVICIOS
import { recoverPass } from '../services/recoverPass.service';
////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { DataRecover } from '../interface/recoverPass';
import { getResponse } from '../services/response-message.service';
////////////////////////////////////////////////

////////////////////////////////////////////////

//CONTROLADOR
export const recoverPass_post = async ( req : Request, res : Response ) => {
	//Recibimos datos
	const { email } = req.body as DataRecover;
	console.log('Email obtenido: ', email);
	/**
	//  * TODO -> Se crea el token con emil y rol
	//  * TODO -> 1)Paso a seguir : Guardar token en Redis
	 * TODO -> 2)enviar codigo de confirmacion al usuario(gmail)
	 * TODO -> 3)Crear ruta de validar token y resetear PASSWORD
	 */
	try {
		const results : boolean | null | undefined | string = await recoverPass({email});
		if(results === null){
			//Not exist
			return res.status(404).json(getResponse('RP03'));
		}else if(results == false){
			//Error en el server
			return res.status(500).json(getResponse('RP02'));
		}else if(results === undefined){
			//Error al guardar token - code
			return res.status(500).json(getResponse('RP01'));
		}else if(results === 'exists'){
			//Code - Token ya creado
			return res.status(202).json({
				results,
				...getResponse('RP06')
			});
		}
		//All ok
		return res.status(200).json({
			Warning : 'CODIGO con 10 min de vida',
			'Code Generado' : results,
			...getResponse('RP05'),
			
		});
	} catch (error) {
		console.log('ERROR: ', error);
		return res.status(500).json(getResponse('RP04'));
	}
};