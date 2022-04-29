//CONTROLADOR DE PROFILE/CONFIG
import { Request, Response } from 'express';

/////////////////////////////////////////
// IMPORTAMOS SERVICIOS

////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { GuideSignup_extra } from '../../interface/Guide/signup-guide.extra';
///////////////////////////////////////

// ->> Ruta GET
export const profileConfig_get = async (req:Request, res:Response) => { 
	return res.status(200).send('Profile Config');
};
/////////////////////////////////////////////////

//->> RUTA POST
//Validar datos de entrada
export const profileConfig_post = async (req:Request, res:Response) => { 
	// Get Data to configure
	const { firstName, lastName, password, dataOfBirth, city, phoneNumber, information } = req.body as GuideSignup_extra;
	//Save or update data in MySQL and MongoDB
	try {
		const registerMongo = '';
		const registerMysql = '';
		//Validar si los datos estan guardados correctamente	
		if(!registerMongo || !registerMysql) {
			//Undefined
			res.status(500).json({ msg : 'Error :: Save Data' });
		}else {
			//Existe el registro

		}
	}catch(err){
		console.log(err);
		res.status(500).json({ msg : 'Error :: ' });
	}
};