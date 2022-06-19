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
	if(result == false){
		//ERROR en obtener las vacantes
		return res.status(500).json(getResponse('SV02'));
	}
	//ALL OK
	return res.status(200).json({result});

};