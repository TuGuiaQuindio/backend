import { Request, Response } from 'express';
/////////////////////////////////////////////////////////
//IMPORTAMOS SERVICIOS
import { showVacanciesService } from '../../services/Guide/showVacancies.service';
import { getResponse } from '../../services/response-message.service';
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

export const showVacancies_get = async (req:Request, res:Response) => {
	//TODO->VALIDAR ROL QUE CONSULTA
	//Mostrar vacantes
	const result = await showVacanciesService();
	console.log(result);
	
	if(result === false)return res.status(500).json(getResponse('SV02'));//ERROR en obtener las vacantes
	if(result === null)return res.status(404).json(getResponse('SV01'));//Vacantes vacias
	//ALL OK
	return res.status(200).json({result});

};