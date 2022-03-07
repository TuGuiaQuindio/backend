// Validamos el token obtenido

import { Request, Response, NextFunction} from 'express';
import { header, validationResult } from 'express-validator';

export default {

    params: [
        header('authorization')
            .not().isEmpty().withMessage("Access token not provided")
            .matches(/^Bearer /).withMessage("Not a valid token")
    ],

    validate : function (req:Request, res:Response, next: NextFunction) {

        console.log("Headers", req.headers)

        const errorRes = validationResult(req);
        if(!errorRes.isEmpty()) {
            return res.status(422).json({ errors: errorRes.array() });
        };
        // Si no hay errores , continuamos
        next()
    },
};