import express from 'express';
import { Response, Request } from 'express';

import path from './paths';
import signUpValidator from '../validator/guide-signup';
import { GuideSignup } from '../interface/signup-guide';

import signup from '../services/signup-db'

const router = express.Router();

///////////////////////////////////////////////
/**
 * Registro de Guias
 */
// Deconstruimos lel objeto
const { params, validate } = signUpValidator;

router.route(path.registerGuide)
    .get((req:Request, res:Response)=>{
        res.send("Get - signup !!");
    })
    .post(params,validate,async (req:Request, res:Response)=>{
        // res.send("POST");
        // Obtenemos los datos del body
        const { firstName, lastName, age, cc, city, phoneNumber, email, password } = req.body as GuideSignup;//Lo referenciamos con la interface
        try {
            // Hacemos el registro de los datos
            const register = await signup( { firstName, lastName, age, cc, city, phoneNumber, email, password}, "guide" );
            // Respondemos al Server
            res.status(200).json({
                msg:"User signed up successfully"
            });

        } catch (e) {
            console.error(e);
            // Respondemos al server
            res.status(401).json({
                msg:"Error"
            })
        }
    });


///////////////////////////////////////////////////////////////
// Exportamos las rutas
export default router