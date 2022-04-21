// CONTROLADOR DE COMPAÑIA

import { Request, Response } from 'express';
/////////////////////////////////////////////////
//IMPORTACIONES DE SERVICIOS
import signup from '../services/signup-db.service';
////////////////////////////////////////////////
//IMPORTACIONES DE INTERFACES
import { CompanySignup } from '../interface/signup-company';
////////////////////////////////////////////////
//->>RUTA GET
export const companySignup_get = async(req:Request, res:Response) => {

	res.send('Signup company');
};

/////////////////////////////////////////////////////
//->>RUTA POST
export const companySignup_post = async(req:Request, res:Response) => {
// Obtenemos los datos del body
	const { nameCompany, nit, phoneNumber, direction, mainActivity, rol, password } = req.body as CompanySignup;
	// Tratamos de hacer esto
	try {
		// Hacemos el registro de la empresa
		const register = await signup( { nameCompany, nit, phoneNumber, direction, mainActivity, rol, password } , 'company' );
		
		//Validamos la respuesta
		if(register != undefined) {
			// Respondemos al Server
			res.status(200).json({
				register,
				msg:'User signed up successfull'
			});
		}else {
			console.log('-> User already exists !');
			// Si no respondemos al cliente
			res.status(303).json({ msg : 'User exists !!' });
			
		}
	} catch (e) {
		console.error(e);
		// Respondemos al servidor 
		res.status(422).json({
			mgs:'Error'
		});
	}
};