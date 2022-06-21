// COMPANY
//CONTROLADOR DE PROFILE/CONFIG
// Controlador de ruta de configuracion de perfil
import { Response, Request } from 'express';

/////////////////////////////////////////////////
//IMPORTACIONES DE SERVICIOS
import { getResponse } from '../../services/response-message.service';
import { updateDataSql, updateDataNoSql, getData } from '../../services/Company/profile.config.service';
/////////////////////////////////////////////////
//IMPORTACIONES DE INTERFACES
import { CompanyDataConfig, DataNoSql, DataSql } from '../../interface/Company/data';
import { Roles } from '../../constants/constants';
/////////////////////////////////////////////////

// ->> RUTA PUT
export const  profileConfig_put = async (req:Request, res:Response) : Promise<Response> =>{
	const { payload } = res.locals;
	//Obtenemos el ID del headers
	const id : number = payload.id; 
	//Obtenemos el rol
	const rol : number = payload.rol;
	// Validamos el rol que coincida
	if(rol != Roles.COMPANY) return res.status(403).json(getResponse('A002'));
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
			return res.status(404).json(getResponse('P005'));
		}else if(!registerSql || !registerNoSql){//false
			return res.status(500).json(getResponse('P002'));
		}else {//True
			//Existe el registro
			return res.status(200).json(getResponse('P003'));
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json(getResponse('E001'));
	}
};

export const getProfileData = async (req:Request, res:Response) => {
	const { payload } = res.locals;
	//Obtenemos el ID del Headers
	const id : number = payload.id;
	//Obtenemos el rol
	const rol : number = payload.rol;
	const email:string = payload.email;
	// Validamos el rol que coincida
	console.log('-> payload - Guide :: ID:',id ,'- ROL:',rol);
	// ROL GUIDE = 1 
	if(rol != Roles.COMPANY) return res.status(403).json(getResponse('A002'));
	//CONTINUA
	if(id == 0) return res.status(422).json({ error:'ID Not Found - Unauthorized' });
	// Get Data to configure

	const response:CompanyDataConfig|null = await getData(id,email);
	//validamos respuesta
	if(response===null)return res.status(404).json(getResponse('P004'));
	//ALL OK
	return res.status(200).json(
		response,
	);

};