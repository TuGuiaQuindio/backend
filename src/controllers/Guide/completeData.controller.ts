import { Request,Response } from 'express';
//////////////////////////////////////////////
//IMPORTAMOC INTERFACES
import { CompleteDataNoSql, CompleteDataSql } from '../../interface/Guide/guideInfo';
//////////////////////////////////////////////
//IMPORTAMOS SERVICIOS
import { getResponse } from '../../services/response-message.service';
//////////////////////////////////////////////
//IMPORTAMOS CONSTANTES
import { Roles } from '../../constants/constants';
import { completeDataServiceSql, completeDataServiceNoSql } from '../../services/Guide/completeData.service';
//////////////////////////////////////////////
//////////////////////////////////////////////

export const completeData_post = async (req:Request, res:Response) : Promise<Response> => {
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
	//OBTENEMOS LOS DATOS
	const { phoneNumber, city, birthDate, hasTransport } = req.body as CompleteDataSql;
	const { availability, aboutMe, verified, firstAid } = req.body as CompleteDataNoSql;

	try {
		const resultSql : boolean | null = await completeDataServiceSql( id ,{phoneNumber, city, birthDate, hasTransport});
		const resultNoSql: boolean | null = await completeDataServiceNoSql(id,{availability, aboutMe, verified, firstAid});
		//Validamos 
		if (resultSql===null) {
			// NO existe el usuario
			return res.status(404).json({msg:'User not Found'});
		}else if(resultSql===false){
			//Algo salio mal en la insercion de datos
			return res.status(500).json({msg:'Error en guardar datos!'});
		}else if(resultNoSql===false){return res.status(500).json({msg:'Error guardando datos!'});}
		//All OK
		return res.status(200).json({msg:'Datos guardados con exito!'});
	} catch (error) {
		//ERROR EN TRATAR 
		console.log('ERROR en tratar',error);
		return res.status(500).json({msg:'ERROR EN CONTROLADOR'});
	}
};