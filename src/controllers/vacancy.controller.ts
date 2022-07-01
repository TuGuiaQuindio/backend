import { Request, Response } from 'express';
//IMPORTAMOS SERVICIOS
import { getVacancy } from '../services/Guide/vacancies.service';
import { getResponse } from '../services/response-message.service';

export const vacancy = async (req:Request, res:Response) => {
	//Obtenemos datos
	const { payload } = res.locals;
	const email:string = payload.email;
	const { idVacancy } = req.body;
	const result = await getVacancy(idVacancy, email);
	//Validamos respuesta
	if(result===null)return res.status(404).json(getResponse('SV22'));
	if(result===false)return res.status(500).json(getResponse('SV44'));//ERROR OBTENIENDO DATOS
	//All ok
	return res.status(200).json({
		...getResponse('SV11'),
		result
	});

};