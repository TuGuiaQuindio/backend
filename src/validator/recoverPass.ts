//VALIDAMOS EL CAMPO EMAIL
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export default{
	params : [
		body('email')
			.not().isEmpty().withMessage('Empty File!, Obligatory')
			.isEmail().withMessage('Please provide a valid email'),
	],
	//Validamos
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