// Importamos 
import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export default {
    // Validamos los datos de entrada por el 'body'
    params:[
        body('nameCompany')
            .not().isEmpty().withMessage("Empty field"),
        body('nit')
            .not().isEmpty().withMessage("Empty field"),
        body('phoneNumber')
            .not().isEmpty().withMessage("Empty field"),
        body('direction')
            .not().isEmpty().withMessage("Empty field"),
        body('mainActivity')
            .not().isEmpty().withMessage("Empty field"),
        body('rol.email')
            .not().isEmpty().withMessage("Empty field")
            .isEmail().withMessage("Please provide a valid email!"),
        body('password')
            .not().isEmpty().withMessage("Empty field"),
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

