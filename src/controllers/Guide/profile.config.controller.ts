// GUIDE
//CONTROLADOR DE PROFILE/CONFIG
import { Request, Response } from 'express';

/////////////////////////////////////////
// IMPORTAMOS SERVICIOS
import { updateDataSql, updateDataNoSql } from '../../services/Guide/update.service';
import { getId } from '../../services/token.service';
////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { GuideSignup_extra } from '../../interface/Guide/signup-guide.extra';
import { GuideInfo } from '../../interface/Guide/guideInfo';
////////////////////////////////////////////////////////////////

//->> RUTA PUT
//Validar datos de entrada
export const profileConfig_put = async (req:Request, res:Response) => { 
	//Obtenemos cabecera
	const authorization : string | undefined = req.headers.authorization;
	//Obtenemos el ID del Headers
	const id : number = await getId(authorization);
	console.log('-> ID payload - Guide :: ', id);
	if(id == 0) return res.status(422).json({ error:'ID Not Found - Unauthorized' });
	// Get Data to configure for the 'Body'
	const { firstName, lastName, dataOfBirth, city, phoneNumber } = req.body as GuideSignup_extra;
	const { information } = req.body as GuideInfo;
	//Save or update data in MySQL and MongoDB
	try {
		// MySQL
		const registerSql : boolean | undefined = await updateDataSql( { id, firstName, lastName, dataOfBirth, city, phoneNumber} );
		// MongoDB
		const registerNoSql : boolean | undefined = await updateDataNoSql( { id, information } );
		//Validar si los datos estan guardados correctamente	
		if(registerNoSql == undefined || registerSql == undefined) {
		// if(registerMysql == undefined){//Undefined
			return res.status(404).json({ msg : 'Error :: User doesn`t exist' });
		}else if(!registerSql || !registerNoSql){//false
			return res.status(500).json({ msg : 'ERROR :: There was an error updating data'});
		}else {//True
			//Existe el registro
			return res.status(200).json({ msg : 'User update'});
		}
	}catch(err){
		console.log(err);
		res.status(500).json({ msg : 'Error :: ' });
	}
};