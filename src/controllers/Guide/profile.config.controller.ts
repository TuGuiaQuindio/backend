//CONTROLADOR DE PROFILE/CONFIG
import { Request, Response } from 'express';

/////////////////////////////////////////
// IMPORTAMOS SERVICIOS
import { updateData } from '../../services/update.service';
////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { GuideSignup_extra } from '../../interface/Guide/signup-guide.extra';
/////////////////////////////////////////////////////

//->> RUTA POST
//Validar datos de entrada
export const profileConfig_put = async (req:Request, res:Response) => { 
	// Get Data to configure
	const { firstName, lastName, dataOfBirth, city, phoneNumber, information } = req.body as GuideSignup_extra;
	//Obtenemos los parametros por ruta
	const { id } = req.params;
	
	//Save or update data in MySQL and MongoDB
	console.log('Id user to update :: ',id);
	//TODO -> ORGANIZAR LAS FUNCIONES A LLAMAR
	try {
		const registerMysql : boolean | undefined = await updateData( { id, firstName, lastName, dataOfBirth, city, phoneNumber}, 'mysql' );
		// !const registerMongo = await updateData( { information }, 'mongodb' );
		//Validar si los datos estan guardados correctamente	
		// !if(!registerMongo || !registerMysql) {
		if(registerMysql == undefined){
			//undefined
			return res.status(404).json({ msg : 'Error :: User doesn`t exist' });
		
		}else if(!registerMysql){
			//False
			return res.status(500).json({ msg : 'ERROR :: There was an error updating data'});
		}else {
			//True
			//Existe el registro
			return res.status(200).json({ msg : 'User update'});
		}
	}catch(err){
		console.log(err);
		res.status(500).json({ msg : 'Error :: ' });
	}
};