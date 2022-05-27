//CONTROLADOR DE RESET-PASS
import { Request, Response } from 'express';
////////////////////////////////////////////////
//IMPORTAMOS SERVICIOS
import { changePass, validateCode, validatedPass } from '../services/resetPass.service';
import { getResponse } from '../services/response-message.service';
////////////////////////////////////////////////
//IMPORTACIONES INTERFACES
import { ResetPass } from '../interface/dataRedis';
////////////////////////////////////////////////

export const resetPass_post = async (req : Request, res : Response) : Promise<Response> => {
	// Obtenemos codigo
	const { code } = req.body;
	//VALIDAMOS EL CODIGO
	const resultValidateCode : null|undefined|object|boolean = await validateCode(code);
	if(resultValidateCode == null){
		//Codigo no valido
		return res.status(406).json(getResponse('C001'));
	}
	//Codigo Valido
	//Validamos que la contraseña coincidan
	const { newPass, confirmPass } = req.body;
	const resultPass : boolean = await validatedPass(newPass, confirmPass);
	console.log('Result Pass new: ', resultPass);
	// Cambiar contraseña
	const response : null|undefined|boolean = await changePass(resultValidateCode as ResetPass, newPass);
	//Validaciones de la respuesta
	if (response == null) return res.status(404).json(getResponse('C003'));
	if (response == false) return res.status(500).json({msg:'No se ha podido Actualizar los datos'});
	//All ok
	// res.status(200).json(getResponse('C002'));
	return res.status(200).json({
		...getResponse('C004')
	});
};