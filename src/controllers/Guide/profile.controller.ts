import {Request, Response} from 'express';
//IMPORTAMOS CONSTANTES
import { Roles } from '../../constants/constants';
import { GuideProfileData } from '../../interface/Guide/guideInfo';
//IMPORTAMOS SERVICIOS
import { profileService } from '../../services/Guide/profile.service';
import { getResponse } from '../../services/response-message.service';

//*GET
export const guideProfileGet = async (req:Request, res:Response) => {
	//OBTENEMOS el payload del token, del isAuth
	const { payload } = res.locals;
	//Obtenemos el id
	const id:number = payload.id; 
	//Obtenemos rol
	const rol: number = payload.rol;
	const email:string = payload.email; 
	// Validamos el rol que coincida
	console.log('-> payload - Guide :: ID:',id ,'- ROL:',rol);
	// ROL GUIDE = 1 
	if(rol != Roles.GUIDE) return res.status(403).json(getResponse('A002'));
	//CONTINUA
	if(id == 0) return res.status(422).json({ error:'ID Not Found - Unauthorized' });
	
	const responseProfile:GuideProfileData|null = await profileService(id,email);

	if(responseProfile==null)return res.status(500).json(getResponse('P001'));
	//all ok
	return res.status(200).json({
		responseProfile,
		...getResponse('P002')
	});
};