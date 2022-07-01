import { Request, Response } from 'express';
//IMPORTAMOS SERVICIOS
import { getVacancie } from '../services/Guide/vacancies.service';
import { getResponse } from '../services/response-message.service';

export const vacancie = async (req:Request, res:Response) => {
	//Obtenemos datos
	const { idVacancy } = req.body;
	const result = await getVacancie(idVacancy);
	//Validamos respuesta
	if(result===null)return res.status(404).json(getResponse('SV22'));
	// if(result)return;
	//All ok
	return res.status(200).json({
		...getResponse('SV11'),
		result
	});

};