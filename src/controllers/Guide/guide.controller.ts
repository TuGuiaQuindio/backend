// CONTROLADOR DE REGISTRO DE GUIA
import { Request, Response } from'express';

////////////////////////////////////////////////////////////////
//IMPORTACIONES DE SERVICIOS
import signup from '../../services/signup-db.service';
import { getResponse } from '../../services/response-message.service';
////////////////////////////////////////////////////////////////
//IMPORTAMOS LAS INTERFACES
import { GuideSignup } from '../../interface/Guide/signup-guide';
////////////////////////////////////////////////////////////////
//IMPORTAMOS ENTIDADES
import { Guide } from '../../model/entity/sql/Guide';
import { Company } from '../../model/entity/sql/Company';
////////////////////////////////////////////////////////////////

// ->>RUTA GET 
export const guideSignup_get = async(req:Request, res:Response) => {
	res.send('Get - signup !!');
};

// ->> RUTA POST
export const guideSignup_post = async(req:Request, res:Response) : Promise<Response>=> {
	// Obtenemos los datos del body
	const { NoDocument, firstName, lastName, rol, password } = req.body as GuideSignup;//Lo referenciamos con la interface
	try {
		// Hacemos el registro de los datos
		const register : Guide | Company | undefined = await signup( { NoDocument, firstName, lastName, rol, password }, 'guide' );
		if(register != undefined) {
			// Respondemos al Server
			return res.status(200).json({
				register,
				...getResponse('R001')
			});
		}else {
			console.log('-> User already exists !');
			// Si no respondemos al cliente
			return res.status(403).json(getResponse('R002'));
			
		}
	} catch (e) {
		console.error(e);
		// Respondemos al cliente
		return res.status(401).json({
			msg:'Error'
		});
	}

};