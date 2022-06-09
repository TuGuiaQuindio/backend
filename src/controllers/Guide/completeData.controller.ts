import { Request,Response } from 'express';
//////////////////////////////////////////////
//IMPORTAMOC INTERFACES
import { CompleteData } from '../../interface/Guide/guideInfo';
//////////////////////////////////////////////
//IMPORTAMOS SERVICIOS
import { getResponse } from '../../services/response-message.service';
import { getId, getRole } from '../../services/token.service';
//////////////////////////////////////////////
//IMPORTAMOS CONSTANTES
import { Roles } from '../../constants/role.constants';
import { completeDataServiceSql } from '../../services/Guide/completeData.service';
//////////////////////////////////////////////
//////////////////////////////////////////////

export const completeData_post = async (req:Request, res:Response) : Promise<Response> => {
	//OBTENEMOS EL TOKEN 
	const { authorization } = req.headers;
	//Obtener el id
	const id : number = await getId(authorization);
	//Obtener rol
	const rol : number = await getRole(authorization);
	//Validamos que el rol coincida
	// ROL GUIDE = 1
	if(rol != Roles.GUIDE) return res.status(403).json(getResponse('A002'));
	//VALIDAMOS EL ID 
	if(id == 0) return res.status(422).json({ error:'ID Not Found - Unauthorized' });
	//CONTINUA
	//OBTENEMOS LOS DATOS
	const { phoneNumber, city, birthDate, hasTransport } = req.body as CompleteData;

	try {
		const result : boolean | null = await completeDataServiceSql( id ,{phoneNumber, city, birthDate, hasTransport});
		//Validamos 
		if (result == null) {
			// NO existe el usuario
			return res.status(404).json({msg:'User not Found'});
		}else if(result == false){
			//Algo salio mal en la insercion de datos
			return res.status(500).json({msg:'Error en guardar datos!'});
		}
		//All OK
		return res.status(200).json({msg:'Datos guardados con exito!'});
	
	} catch (error) {
		//ERROR EN TRATAR 
		console.log('ERROR en tratar',error);
		return res.status(500).json({msg:'ERROR EN CONTROLADOR'});
	}
};