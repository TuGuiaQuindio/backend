//Controlador de recuperar contraseña - GUIA / EMPRESA
import { Request, Response } from 'express';


////////////////////////////////////////////////
//IMPORTAMOS SERVICIOS
import { recoverPass } from '../services/recoverPass.service';
////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { DataRecover } from '../interface/recoverPass';
////////////////////////////////////////////////

////////////////////////////////////////////////

////////////////////////////////////////////////
//CONTROLADOR
export const recoverPas = async ( req : Request, res : Response ) => {
	//Recibimos datos
	const { email } = req.body as DataRecover;
	console.log('Email obtenido: ', email);
	/**
	 * TODO -> Se crea el token con emil y rol
	 * TODO -> 1)Paso a seguir : Guardar token en Redis
	 * TODO -> 2)enviar codigo de confirmacion al usuario(gmail)
	 * TODO -> 3)Crear ruta de validar token y resetear PASSWORD
	 * TODO -> MIRAR QUE PASO SIGUE   
	 */
	try {
		const results : boolean | null | undefined | string = await recoverPass({email});
		if(results == null){
			//Not exist
			return res.status(404).json({msg:'Credenciales Incorrectas'});
		}else if (results == false){
			//Error en el server
			return res.status(500).json({msg:'Ocurrio un error(createToken), intente de nuevo'});
		}
		//All ok
		return res.status(200).json({
			results,
			msg:'Token generado'
		});
	} catch (error) {
		console.log('ERROR: ', error);
		return res.status(500).json({msg:'Ocurrio un error en el controlador'});
	}
};