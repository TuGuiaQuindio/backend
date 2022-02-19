
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Exportamos por defecto
export default {
// Obtenemos los parametros
    params: [
        body('email').isEmail().not().isEmpty(),
    ],
    // Validamos
    validate: function(req:Request, res:Response, next: NextFunction) {
        const errors = validationResult(req);
        // Si es diferente
        if(!errors.isEmpty()){
            return res.status(422).json({
                errors: errors
            });
        };
        // Por el contrario continua
        next();
    },
};
