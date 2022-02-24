// Importamos 
import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export default {
    // Validamos los datos de entrada por el 'body'
    params:[
        body('nameCompany')
        ,
        body('nit')
        ,
        body('phoneNumber')

    ],
    // Validamos
    validate: function(req:Request, res:Response, next:NextFunction) {
        const error = validationResult(req);

        if(!error.isEmpty()){
            // Retornamos y respondemos al server
            return res.status(422).json({
                error: error.array()
            })
        };
        // Sino hay errores, continuamos
        next();
    }
};

