//Validador 

import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export default{
	params : [
		body('code')
			.not().isEmpty().withMessage('Empty Fiel!'),
		body('newPass')
			.not().isEmpty().withMessage('Empty Field!')
			.isLength({min:7, max:30}).withMessage('Debe de contener min 7, max 30 caracteres'),
		body('confirmPass')
			.not().isEmpty().withMessage('Empty Field!')
			.isLength({min:7, max:30}).withMessage('Debe de contener min 7, max 30 caracteres'),
	],

	validate : function(req:Request, res:Response, next:NextFunction){
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