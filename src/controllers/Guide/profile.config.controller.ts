// GUIDE
//CONTROLADOR DE PROFILE/CONFIG
import { Request, Response } from 'express';

////////////////////////////////////////////////////////////////
// IMPORTAMOS SERVICIOS
import { updateDataSql, updateDataNoSql, getData } from '../../services/Guide/profile.config.service';
import { getId, getRole } from '../../services/token.service';
import { getResponse } from '../../services/response-message.service';
////////////////////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { GuideSignup_extra } from '../../interface/Guide/signup-guide.extra';
import { GuideDataConfig, GuideInfo, GuideInfoAdditional } from '../../interface/Guide/guideInfo';
////////////////////////////////////////////////////////////////
//IMPORTAMOS CONSTANTES
import { Roles } from '../../constants/constants';
////////////////////////////////////////////////////////////////

//->> RUTA PUT
//Validar datos de entrada
export const profileConfig_put = async (req:Request, res:Response) : Promise<Response> => { 
	//OBTENEMOS TOKEN
	const { payload } = res.locals;
	//OBTENEMOS ID  
	const id : number = payload.id;
	//OBTENEMOS ROL
	const rol : number = payload.rol;
	console.log('-> Payload - Company :: ID :', id, '- ROl :',rol );
	//Validamos que el rol coincida
	// ROL COMPANY = 2
	if(rol != Roles.GUIDE) return res.status(403).json(getResponse('A002'));
	//VALIDAMOS EL ID 
	if(id == 0) return res.status(422).json({ error:'ID Not Found - Unauthorized' });
	//CONTINUA
	// Get Data to configure for the 'Body'
	const { firstName, lastName, birthDate, city, phoneNumber } = req.body as GuideSignup_extra;
	const { information, /*availability, aboutMe, verified, firstAid*/ } = req.body as GuideInfo;
	const { availability, aboutMe, verified, firstAid } = req.body as GuideInfoAdditional;
	//Save or update data in MySQL and MongoDB

	console.log('availability: ',availability,'\naboutMe:',aboutMe,'\nverified: ',verified,'\nfirstAid: ',firstAid);
	

	try {
		// MySQL
		const registerSql : boolean | undefined = await updateDataSql( { id, firstName, lastName, birthDate, city, phoneNumber} );
		// MongoDB
		const registerNoSql : boolean | undefined = await updateDataNoSql( id,{ information }, {availability, aboutMe, verified, firstAid} );
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
	}catch(err){
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
	if(rol != Roles.GUIDE) return res.status(403).json(getResponse('A002'));
	//CONTINUA
	if(id == 0) return res.status(422).json({ error:'ID Not Found - Unauthorized' });
	// Get Data to configure

	const response:GuideDataConfig|null = await getData(id,email);
	//validamos respuesta
	if(response===null)return res.status(404).json(getResponse('P004'));
	//ALL OK
	return res.status(200).json(
		response,
	);

};