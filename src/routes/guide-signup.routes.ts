import express from 'express';
import { Response, Request } from 'express';

import path from './paths';
import signUpValidator from '../validator/guide-signup';
import { GuideSignup } from '../interface/signup-guide';

import signup from '../services/signup-db.service'

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
        const { NoDocument, firstName, lastName, age, city, phoneNumber, rol, password } = req.body as GuideSignup;//Lo referenciamos con la interface
        try {
            // Hacemos el registro de los datos
            const register = await signup( { NoDocument,firstName, lastName, age, city, phoneNumber, rol, password}, "guide" );

            if(register != undefined) {
                // Respondemos al Server
                res.status(200).json({
                    register,
                    msg:"User signed up successfull"
                });
            }else {
                console.log("-> User already exists !");
                // Si no respondemos al cliente
                res.status(303).json({ msg : "User exists !!" })
                
            }
        } catch (e) {
            console.error(e);
            // Respondemos al cliente
            res.status(401).json({
                msg:"Error"
            })
        }
    });

// Rutas con parametros
router.route('/guide/:id')
    .get()
    .put()
    .delete()


///////////////////////////////////////////////////////////////
// Exportamos las rutas
export default router