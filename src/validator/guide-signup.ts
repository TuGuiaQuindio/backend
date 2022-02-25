import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

// Exportamos por defecto
export default {
// Obtenemos los parametros
    params: [
        body('firstName')
            .not().isEmpty().withMessage("Empty field!!"),
        body('lastName')
            .not().isEmpty().withMessage("Empty field"),
        body('age')
            .not().isEmpty().withMessage("Empty field!")
            .isNumeric().withMessage("Datos no numerico!"),
        body('cc')
            .not().isEmpty().withMessage("Empty field!"),
        body('city')
            .not().isEmpty().withMessage("Empty field!"),
        body('phoneNumber')
            .not().isEmpty().withMessage("Empty field!"),
    ],
    // Validamos
    validate: function(req:Request, res:Response, next:NextFunction){
        const errors = validationResult(req);
        // Si es diferente 
        if(!errors.isEmpty()){
            return res.status(422).json({
                errors: errors.array()
            });
        };
        // Si no hay errores, por lo contrario continua
        next();
    },
};