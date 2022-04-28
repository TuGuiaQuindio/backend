//CONTROLADOR DE PROFILE/CONFIG
import { Request, Response } from 'express';

/////////////////////////////////////////
// IMPORTAMOS SERVICIOS

////////////////////////////////////////
//IMPORTAMOS INTERFACES

///////////////////////////////////////

// ->> Ruta GET
export const profileConfig_get = async (req:Request, res:Response) => { 
	return res.status(200).send('Profile Config');
};
/////////////////////////////////////////////////

//->> RUTA POST
//Validar datos de entrada
export const profileConfig_post = async (req:Request, res:Response) => { 
	// Get Data
	const { age, city, phoneNumber, information } = req.body;
	//Save data in MySQL and MongoDB
	
	//Validar si los datos estan guardados correctamente
		
};