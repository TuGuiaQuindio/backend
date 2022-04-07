
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Exportamos por defecto
export default {
// Obtenemos los parametros
	params: [
		body('email')
			.not().isEmpty().withMessage('Empty field!')
			.isEmail().withMessage('Please provide a valid email!'),
		body('password')
			.not().isEmpty().withMessage('Empty field!')
			.isLength({min:7 , max:30}).withMessage('Debe de contener min 7 caracteres'),
	],
	// Validamos
	validate: function(req:Request, res:Response, next: NextFunction) {
		const errors = validationResult(req);
		// Si es diferente
		if(!errors.isEmpty()){
			return res.status(422).json({
				errors: errors.array()
			});
		}
		// Por el contrario continua
		next();
	},
};
