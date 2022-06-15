
import {Request, Response} from 'express';
//////////////////////////////////////////////////////////
// IMPORTAMOS SERVICIOS
import { createVacancyService, deleteVacancyService, updateVacancyService } from '../../services/Company/vacancy.service';
import { getResponse } from '../../services/response-message.service';
//////////////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { Vacancy } from '../../interface/Company/data';
//////////////////////////////////////////////////////////
//IMPORTAMOS CONSTANTES
import { Roles } from '../../constants/constants';
//////////////////////////////////////////////////////////
//*POST
export const createVacancy_post = async (req:Request, res:Response) : Promise<Response> => {
	//OBTENEMOS el payload del token, del isAuth
	const { payload } = res.locals;
	//Obtenemos el id
	const id:number = payload.id; 
	//Obtenemos rol
	const rol: number = payload.rol;
	//Obtener permiso de acceso
	const accessPermit : []|undefined = payload.permissions;
	console.log('Payload: ',id, rol, accessPermit);
	//Validamos que el rol coincida | que este los permisos
	if(!accessPermit) return res.status(404).json({msg:'NO tiene permisos'});
	// ROL COMPANY = 1
	if(rol != Roles.COMPANY) return res.status(403).json(getResponse('A002'));
	//VALIDAMOS EL ID 
	if(id == 0) return res.status(422).json({ error:'ID Not Found - Unauthorized' });
	//CONTINUA);
	//Obtenemos datos
	const { title, description, salary, schedule } = req.body as Vacancy; 
	//Pasamos datos
	const response:boolean|null|undefined = await createVacancyService(id,{title, description, salary, schedule}, accessPermit);
	//Validamos la respuesta
	if (response == false) {
		return res.status(500).json(getResponse('V002'));//ERROR del server
	}else if(response === null){
		return res.status(404).json(getResponse('V004'));
	}else if(response === undefined){
		return res.status(403).json(getResponse('V003'));
	}
	//ALL OK
	return res.status(200).json(getResponse('V001'));
};
//*PUT
export const vacancy_put = async (req:Request, res:Response) => {
	//OBTENEMOS el payload del token, del isAuth
	const { payload } = res.locals;
	//Obetner el id de la vacante -> ObjectId mongo
	const objectId:string = req.params[0];
	//Obtenemos el id
	const id:number = payload.id; 
	//Obtenemos rol
	const rol: number = payload.rol;
	console.log('Payload: ',id, rol);
	// ROL COMPANY = 1
	if(rol != Roles.COMPANY) return res.status(403).json(getResponse('A002'));
	//VALIDAMOS EL ID 
	if(id == 0) return res.status(422).json({ error:'ID Not Found - Unauthorized' });
	//CONTINUA);
	//Obtenemos datos
	const { title, description, salary, schedule } = req.body;
	const resultUpdate = updateVacancyService(objectId, {title, description, salary,schedule}) ;
	//Validamos respuesta
	if(resultUpdate === null){
		return res.status(404).json(getResponse('UV01'));
	}
	else if(resultUpdate === undefined){
		return res.status(500).json(getResponse('UV02'));
	}
	//ALL OK
	return res.status(200).json(getResponse('UV03'));
};
//*DEL
export const vacancy_del = async (req:Request, res:Response) => {
	//Obetner el id de la vacante -> ObjectId mongo
	const objectId:string = req.params[0];
	//OBTENEMOS el payload del token, del isAuth
	const { payload } = res.locals;
	//Obtenemos el id
	const id:number = payload.id; 
	//Obtenemos rol
	const rol: number = payload.rol;
	console.log('Payload: ',id, rol);
	// ROL COMPANY = 1
	if(rol != Roles.COMPANY) return res.status(403).json(getResponse('A002'));
	//VALIDAMOS EL ID 
	if(id == 0) return res.status(422).json({ error:'ID Not Found - Unauthorized' });
	//CONTINUA);
	//Obtenemos datos
	const response:boolean|null = await deleteVacancyService(id,objectId);
	//Validamos respouesta
	if(response === null)return res.status(500).json({msg:'No se pudo eliminar la vacante'});
	//ALL ok
	return res.status(200).json({msg:'Vacante eliminada'});
};