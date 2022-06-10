
import {Request, Response} from 'express';
//////////////////////////////////////////////////////////
// IMPORTAMOS SERVICIOS
import { createVacancyService } from '../../services/Company/createVacancy.service';
import { getAccessPermit, getId, getRole } from '../../services/token.service';
import { getResponse } from '../../services/response-message.service';
//////////////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { Vacancy } from '../../interface/Company/data';
//////////////////////////////////////////////////////////
//IMPORTAMOS CONSTANTES
import { Roles } from '../../constants/constants';
//////////////////////////////////////////////////////////

export const createVacancy_post = async (req:Request, res:Response) : Promise<Response> => {
	const { authorization } = req.headers;
	//Obtenemos el id
	const id:number = await getId(authorization); 
	//Obtenemos rol
	const rol: number = await getRole(authorization);
	//Obtener permiso de acceso
	const accessPermit : []|undefined = await getAccessPermit(authorization);

	console.log('Payload: ',id, rol);
	//Validamos que el rol coincida | que este los permisos
	if(!accessPermit) return res.status(404).json({msg:'NO tiene permisos'});
	// ROL COMPANY = 1
	if(rol != Roles.COMPANY) return res.status(403).json(getResponse('A002'));
	//VALIDAMOS EL ID 
	if(id == 0) return res.status(422).json({ error:'ID Not Found - Unauthorized' });
	//CONTINUA);
	//Obtenemos datos
	const { title, description, salary, schedule } = req.body as Vacancy; 

	const response = await createVacancyService(id,{title, description, salary, schedule}, accessPermit);

	return res.status(200).json({msq:'MELO'});
};