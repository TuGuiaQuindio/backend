import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export default {

    params: [
        body('firstName')
            .not().isEmpty().withMessage("Empty field!!"),
        // body('lastName')
        //     .not().isEmpty().withMessage("Campo vacio"),
        // body('age')
        //     .not().isEmpty().withMessage("Campo vacio")
        //     .isNumeric().withMessage("Datos no numerico!"),
        // body('cc')
        //     .not().isEmpty().withMessage("Campo Vacio"),
        // body('phoneNumber')
        //     .not().isEmpty().withMessage("Campo vacio"),
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