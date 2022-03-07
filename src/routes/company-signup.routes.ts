import express from 'express';
import { Request, Response } from 'express';

import path from './paths/index';
import signUpValidator from '../validator/company-signup';
import { CompanySignup } from '../interface/signup-company';

import signup from '../services/signup-db.service'
// Obtenemos las rutas
const router = express.Router();
/////////////////////////////////////////////////
/**
 * Registro de Empresa
 */
const { params, validate } = signUpValidator;

router.route(path.registerCompany)
    .get((req:Request, res:Response)=>{
        res.send("Signup company");
    })
    .post(params, validate, async(req:Request, res:Response) => {

        // Obtenemos los datos del body
        const { nameCompany, nit, phoneNumber, direction, mainActivity, email, password } = req.body as CompanySignup;
        // Tratamos de hacer esto
        try {
            // Hacemos el registro de la empresa
            const register = await signup( { nameCompany, nit, phoneNumber, direction, mainActivity, email, password } , "company" );
            
            //Validamos la respuesta
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
            // Respondemos al servidor 
            res.status(422).json({
                mgs:'Error'
            })
        }
    })

////////////////////////////////////////////////////7
// Exportamos las rutas
export default router