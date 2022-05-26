//CONTROLADOR DE RESET-PASS
import { Request, Response } from 'express';
////////////////////////////////////////////////
//IMPORTAMOS SERVICIOS
import { validateCode, validatedPass } from '../services/reset-code.service';
import { getResponse } from '../services/response-message.service';
////////////////////////////////////////////////

////////////////////////////////////////////////

////////////////////////////////////////////////

////////////////////////////////////////////////

export const resetPass_post = async (req : Request, res : Response) => {
	// Obtenemos codigo
	const { code } = req.body;
	//VALIDAMOS EL CODIGO
	const resultValidateCode = await validateCode(code);
	
	if(resultValidateCode == null){
		//Codigo no valido
		return res.status(406).json(getResponse('C001'));
	}

	//Codigo Valido
	return res.status(200).json(getResponse('C002'));
	
	//TODO-> CONTINUAR: Se valida contraseñas nuevas
	//Validamos que la contraseña coincidan
	// const { newPass, confirmPass } = req.body;
	// const resultPass = validatedPass(newPass, confirmPass);
	//Buscamos usuario por gmail a la DB

	//Obtenemos las contraseñas nuevas

	//Actualizamos contraseña


	
	

};