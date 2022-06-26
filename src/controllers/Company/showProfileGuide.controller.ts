import { Request, Response } from 'express';
import { GuideProfileData } from '../../interface/Guide/guideInfo';
/////////////////////////////////////////////////////////
//IMPORTAMOS SERVICIOS
import { getProfilesGuides } from '../../services/getProfilesGuides.service';
import { getResponse } from '../../services/response-message.service';
/////////////////////////////////////////////////////////
//IMPORTAMOS CONSTANTES
import { Roles } from '../../constants/constants';
//////////////////////////////////////////////////////////

export const showProfiles = async (req:Request,res:Response) => {
	//OBTENEMOS TOKEN
	const { payload } = res.locals;
	//OBTENEMOS ID  
	const id : number = payload.id;
	//OBTENEMOS ROL
	const rol : number = payload.rol;
	console.log('-> Payload - Company :: ID :', id, '- ROl :',rol );
	//Validamos que el rol coincida
	// ROL COMPANY = 2
	if(rol != Roles.COMPANY) return res.status(403).json(getResponse('A002'));
	//VALIDAMOS EL ID 
	if(id == 0) return res.status(422).json({ error:'ID Not Found - Unauthorized' });
	//CONTINUA
	//Mostrar vacantes
	const result:boolean|Array<GuideProfileData>|null = await getProfilesGuides();
	
	if(result===false)return res.status(500).json(getResponse('SP02'));//ERROR al obtener los datos
	if(result===null)return res.status(404).json(getResponse('SP03'));//No hay perfiles disponibles
	//ALL OK
	return res.status(200).json({
		'Profiles':result,
		...getResponse('SP01')
	});
};