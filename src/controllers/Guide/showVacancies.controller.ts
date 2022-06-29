import { Request, Response } from 'express';
/////////////////////////////////////////////////////////
//IMPORTAMOS SERVICIOS
import { showVacanciesService } from '../../services/Guide/vacancies.service';
import { getResponse } from '../../services/response-message.service';
/////////////////////////////////////////////////////////
//IMPORTAMOS CONTANTES
import { Roles } from '../../constants/constants';
/////////////////////////////////////////////////////////

export const showVacancies_get = async (req:Request, res:Response) => {
	//TODO->VALIDAR ROL QUE CONSULTA
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
	//Mostrar vacantes
	const result = await showVacanciesService();
	console.log(result);
	
	if(result === false)return res.status(500).json(getResponse('SV02'));//ERROR en obtener las vacantes
	if(result === null)return res.status(404).json(getResponse('SV01'));//Vacantes vacias
	//ALL OK
	return res.status(200).json({result});

};