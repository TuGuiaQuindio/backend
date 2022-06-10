//Controlador para el login

import { Request, Response } from 'express';
////////////////////////////////////////////////////////////////
// IMPORTACIONES DE SERVICIOS
import authSrv from '../services/auth.service';
import { getResponse } from '../services/response-message.service';
////////////////////////////////////////////////////////////////
//IMPORTACIONES DE INTERFACES
import { Auth, User } from '../interface/user';
import { Roles } from '../constants/constants';
////////////////////////////////////////////////////////

// ->> RUTA GET
export const loginGet = (req:Request, res:Response) => {
	return res.status(200).send('Login-GET');
};
////////////////////////////////////////////////////////////////
// ->>RUTA POST
export const loginPost = async (req:Request, res:Response) : Promise<Response> => {
	// Obtenemos los datos del body
	const { email, password } = req.body as User;
	try{
		// obtenemos el token
		const result : Auth | boolean = await authSrv.login(email, password);

		// si retorna el toquen
		// Si nos retorna un false es porque ocurrio un error
		if(result === false){
			// Respondemos al cliente
			return res.status(401).json(getResponse('L002'));
			// Por lo contrario repondemos
		}else{
			const company = result as Auth;
			
			//Es empresa
			console.log('>>ROLE: ',company.role);
			if(company.role == Roles.COMPANY){
				//COMPANY
				// console.log('token: ',token);
				return res.status(200).json({
					resultCompany: result,
					...getResponse('L200')
				});
			}
			//GUIDE
			return res.status(200).json({
				resultGuide: result,
				...getResponse('L200')
			});
		}
	}catch(e){// Si nos devuelve un error
		// Mostramos el error
		console.log(e);
		// Respondemos al server
		return res.status(401).json(getResponse('E002'));//Invalid credentials
	}
};