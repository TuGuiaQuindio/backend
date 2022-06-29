import { Request, Response } from 'express';
//IMPORTAMOS CONSTANTES
import { Roles } from '../../constants/constants';
import { DataApplicantVacancy } from '../../interface/Company/data';
import { saveDataApplicant } from '../../services/Guide/vacancies.service';
//IMPORTAMOS SERVICIOS
import { getResponse } from '../../services/response-message.service';
//IMPORTAMOS INTERFACES

export const applyVacancy = async (req:Request, res:Response) => {
	//OBTENEMOS TOKEN
	const { payload } = res.locals;
	//OBTENEMOS ID  
	const idGuide : number = payload.id;
	//OBTENEMOS ROL
	const rol : number = payload.rol;
	console.log('-> Payload - Company :: ID :', idGuide, '- ROl :',rol );
	//Validamos que el rol coincida
	// ROL COMPANY = 2
	if(rol != Roles.GUIDE) return res.status(403).json(getResponse('A002'));
	//VALIDAMOS EL ID 
	if(idGuide == 0) return res.status(422).json({ error:'ID Not Found - Unauthorized' });
	//CONTINUA
	//OBTENEMOS DATOS
	const email:string = payload.email;
	const { idVacancy } = req.body;
	//Obtenemos datosa guardar
	const data:DataApplicantVacancy = {
		idGuide,
		email
	} as DataApplicantVacancy;

	const resultSave:boolean|null = await saveDataApplicant(idVacancy, data);
	//Validamos respuesta
	if(resultSave===null)return res.status(404).json(getResponse('AV02'));//No hay vacante a ese id
	if(resultSave===false)return res.status(500).json(getResponse('AV03'));//Error al aplicar a la vacante
	//ALL OK
	return res.status(200).json(getResponse('AV01'));

};