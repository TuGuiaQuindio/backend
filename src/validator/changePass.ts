//Validamos los datos de entrada del cambio de contraseña
import { Request, Response, NextFunction } from 'express'; 
import { body, validationResult } from 'express-validator';

export default {
	paramsData : [
		body('currentPassword')
			.not().isEmpty().withMessage('Empty Field!')
			.isLength({min:7 , max:30}).withMessage('Debe de contener min 7 y max 30 Caracteres'),
		body('newPass')
			.not().isEmpty().withMessage('Empty Filed!')
			.isLength({ min:7 , max:30 }).withMessage('Debe de contener min 7, max 30 caracteres'),
		body('confirmPass')
			.not().isEmpty().withMessage('Empty Filed!')
			.isLength({ min:7 , max:30 }).withMessage('Debe de contener min 7, max 30 caracteres'),
	],
	//Validmaos
	validateData : function(req:Request, res:Response, next:NextFunction){
		const errors = validationResult(req);
		// Si es diferente 
		if(!errors.isEmpty()){
			return res.status(422).json({
				errors: errors.array()
			});
		}
		// Si no hay errores, por lo contrario continua
		next();
	}
};