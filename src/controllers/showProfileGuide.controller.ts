import { Request, Response } from 'express';
import { GuideProfileData } from '../interface/Guide/guideInfo';
/////////////////////////////////////////////////////////
//IMPORTAMOS SERVICIOS
import { getProfilesGuides } from '../services/getProfilesGuides.service';
import { getResponse } from '../services/response-message.service';
/////////////////////////////////////////////////////////
//IMPORTAMOS 

//////////////////////////////////////////////////////////

export const showProfile = async (req:Request,res:Response) => {
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