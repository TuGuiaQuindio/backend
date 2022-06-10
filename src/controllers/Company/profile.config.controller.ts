// COMPANY
//CONTROLADOR DE PROFILE/CONFIG
// Controlador de ruta de configuracion de perfil
import { Response, Request } from 'express';

/////////////////////////////////////////////////
//IMPORTACIONES DE SERVICIOS
import { getResponse } from '../../services/response-message.service';
import { getId, getRole } from '../../services/token.service';
import { updateDataSql, updateDataNoSql } from '../../services/Company/update.service';
/////////////////////////////////////////////////
//IMPORTACIONES DE INTERFACES
import { DataNoSql, DataSql } from '../../interface/Company/data';
/////////////////////////////////////////////////

// ->> RUTA PUT
export const  profileConfig_put = async (req:Request, res:Response) : Promise<Response> =>{
	//Obtenemos cabecera
	const authorization : string | undefined = req.headers.authorization;
	//Obtenemos el ID del headers
	const id : number = await getId(authorization); 
	//Obtenemos el rol
	const rol : number = await getRole(authorization);
	// Validamos el rol que coincida
	if(rol != 2) return res.status(403).json(getResponse('A002'));
	//CONTINUA
	console.log('-> payload - Company :: ID:',id ,'- ROL:',rol);
	if(id == 0) return res.status(422).json({ error:'ID Not found - Unauthorized' });
	//Obtenemos los datos del body
	const { nameCompany, address, phoneNumber } = req.body as DataSql ;
	const { mainActivity } = req.body as DataNoSql;
	//Save or update data in MySQL and MongoDB
	try {
		// MySQL
		const registerSql = await updateDataSql({ id, nameCompany, address, phoneNumber });
		// MongoDB
		const registerNoSql = await updateDataNoSql(id, { mainActivity });
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
	} catch (err) {
		console.log(err);
		return res.status(500).json(getResponse('E001'));
	}
};