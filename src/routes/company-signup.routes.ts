import express from 'express';
import { Request, Response } from 'express';

import path from './paths';
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
        // TODO -> mirar que datos se le pediran a las empresas
        const { nameCompany, nit, phoneNumber,email, password } = req.body as CompanySignup;
        // Tratamos de hacer esto
        try {
            // Hacemos el registro de la empresa
            const register = await signup( { nameCompany, nit, phoneNumber, email, password } , "company" );
            // Respondemos al server
            res.status(200).json({
                msg:"Signed up seccessfully"
            });

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