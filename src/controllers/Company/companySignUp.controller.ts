// CONTROLADOR DE COMPAÑIA
import { Request, Response } from 'express';
/////////////////////////////////////////////////
//IMPORTACIONES DE SERVICIOS
import signup from '../../services/signup-db.service';
import { getResponse } from '../../services/response-message.service';
////////////////////////////////////////////////
//IMPORTACIONES DE INTERFACES
import { CompanySignup } from '../../interface/Company/data';
/////////////////////////////////////////////////////
//->>RUTA POST
export const companySignup_post = async(req:Request, res:Response) : Promise<Response> => {
// Obtenemos los datos del body
	const { nameCompany, nit, address, rol, password } = req.body as CompanySignup;
	// Tratamos de hacer esto
	try {
		// Hacemos el registro de la empresa
		const register = await signup( { nameCompany, nit, address, rol, password } , 'company' );
		
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
		return res.status(500).json(getResponse('E001'));
	}
};
