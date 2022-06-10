import { Request,Response } from 'express';
//////////////////////////////////////////////
//IMPORTAMOC INTERFACES
import { CompleteDataSql, DataNoSql } from '../../interface/Company/data';
//////////////////////////////////////////////
//IMPORTAMOS SERVICIOS
import { getId, getRole } from '../../services/token.service';
import { getResponse } from '../../services/response-message.service';
//////////////////////////////////////////////
//IMPORTAMOS CONSTANTES
import { Roles } from '../../constants/constants';
import { completeDataServiceNoSql, completeDataServiceSql } from '../../services/Company/completeData.service';
//////////////////////////////////////////////
//////////////////////////////////////////////

export const completeData_post = async ( req : Request, res : Response ) => {
	//OBTENEMOS EL TOKEN 
	const { authorization } = req.headers;
	//Obtener el id
	const id : number = await getId(authorization);
	//Obtener rol
	const rol : number = await getRole(authorization);
	console.log('Payload: ',id, rol);
	//Validamos que el rol coincida
	// ROL COMPANY = 1
	if(rol != Roles.COMPANY) return res.status(403).json(getResponse('A002'));
	//VALIDAMOS EL ID 
	if(id == 0) return res.status(422).json({ error:'ID Not Found - Unauthorized' });
	//CONTINUA
	//OBTENEMOS LOS DATOS
	const { phoneNumber } = req.body as CompleteDataSql;
	const { mainActivity } = req.body as DataNoSql;
	//Guardamos en SQL
	const resultSql : boolean|null = await completeDataServiceSql(id, { phoneNumber });	
	//Guardamos en NoSQL
	const resultNoSql : boolean |null = await completeDataServiceNoSql(id, { mainActivity });
	console.log('Sql=',resultSql,'\nNoSql=',resultNoSql);
	
	//VALIDAMOS RESPUESTA
	if(resultNoSql == null || resultSql == null){
		//User no existe
		return res.status(404).json({msg:'Usuario no encontrado!'});
	}else if(resultNoSql == false || resultSql == false){
		//Error en actualizar 
		return res.status(500).json({msg:'ERROR en actualizar datos'});
	}
	//ALL OK
	return res.status(200).json({msg:'Datos guardados!'});
};
