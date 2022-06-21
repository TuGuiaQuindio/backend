//Validador de datos 
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
export default {
	//
	params: [
		body('title')
			.not().isEmpty().withMessage('Required field!'),
		body('description')
			.not().isEmpty().withMessage('Required field!'),
		body('salary')
			.not().isEmpty().withMessage('Required field!')
			.isNumeric().withMessage('Debe ser un dato numerico'),
		body('schedule')
			.not().isEmpty().withMessage('Required field!'),
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