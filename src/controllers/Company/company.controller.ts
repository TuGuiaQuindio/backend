// CONTROLADOR DE COMPAÑIA

import { Request, Response } from 'express';
/////////////////////////////////////////////////
//IMPORTACIONES DE SERVICIOS
import signup from '../../services/signup-db.service';
import { getResponse } from '../../services/response-message.service';
////////////////////////////////////////////////
//IMPORTACIONES DE INTERFACES
import { CompanySignup } from '../../interface/Company/signup-company';
////////////////////////////////////////////////
//->>RUTA GET
export const companySignup_get = async(req:Request, res:Response) => {

	res.send('Signup company');
};

/////////////////////////////////////////////////////
//->>RUTA POST
export const companySignup_post = async(req:Request, res:Response) => {
// Obtenemos los datos del body
	const { nameCompany, nit, direction, rol, password } = req.body as CompanySignup;
	// Tratamos de hacer esto
	try {
		// Hacemos el registro de la empresa
		const register = await signup( { nameCompany, nit, direction, rol, password } , 'company' );
		
		//Validamos la respuesta
		if(register != undefined) {
			// Respondemos al Server
			return res.status(200).json({
				register,
				...getResponse('R001')
			});
		}else {
			console.log('-> User already exists !');
			// Si no respondemos al cliente
			return res.status(303).json(getResponse('R002'));
			
		}
	} catch (e) {
		console.error(e);
		// Respondemos al servidor 
		return res.status(422).json({
			mgs:'Error'
		});
	}
};
