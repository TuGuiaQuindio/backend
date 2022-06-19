import { Request, Response } from 'express';
//IMPORTAMOS CONSTANTES
import { Roles } from '../../constants/constants';
//IMPORTAMOS SERVICIOS
import { getResponse } from '../../services/response-message.service';
import { visibilityService } from '../../services/Guide/profile.service';


export const profileVisibility = async (req:Request, res:Response) => {
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

	const { visibility } = req.body;

	const result:boolean|null = await visibilityService(id,email,visibility);
	//Validamos respuesta
	if(result === null)return res.status(404).json(getResponse('PV02'));
	if(result === false)return res.status(500).json(getResponse('PP03'));
	//ALL oK
	return res.status(200).json(getResponse('PV01'));
};