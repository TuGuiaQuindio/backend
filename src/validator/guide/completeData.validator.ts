//Validador de datos 
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
export default {
	//
	params: [
		body('phoneNumber')
			.not().isEmpty().withMessage('Required field!')
			.matches(/^(?:\(\+[0-9]{1,3}\)|\+[0-9]{1,3}|.?)\s?[0-9]{3}[\s-]?[0-9]{3}[\s-]?[0-9]{2,6}[\s-]?[0-9]{2,6}$/).withMessage('Not a valid Data'),
		body('city')
			.not().isEmpty().withMessage('Required field!'),
		body('birthDate')
			.notEmpty().withMessage('Required field!'),
		body('hasTransport')
			.not().isEmpty().withMessage('Required field!')
			.isBoolean().withMessage('La propiedad "hasTransport" solo acepta booleanos'),
	],
	//
	validate: function(req:Request, res:Response, next:NextFunction){
		//Obtenemos el error
		const errors = validationResult(req);
		// Si es diferente
		if(!errors.isEmpty()){
			return res.status(422).json({
				errors: errors.array()
			});
		}
		// Por el contrario continua
		next();
	}
};	