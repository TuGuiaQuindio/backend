// Requerimos express
import express from 'express';
import path from "./paths";
import { User } from "../interface/user";
import { Request, Response } from 'express';
import authSrv from "../services/auth.service";
import loginValidator from '../validator/login';

const router = express.Router();
////////////////////////////////////////////////////////////////
/**
 * ----> LOGIN <----
 */
// Añado los validators, deconstruccion 
const { params, validate } = loginValidator;

router.route(path.login)
    .get((req:Request, res:Response) => {
        res.send("Hi from Login -GET !!");
    })
    .post(params,validate,async (req:Request, res:Response) => {
        // Obtenemos los datos del body
        const { email, password } = req.body as User;
        try{
            // obtenemos el token
            const token = await authSrv.login(email, password);
            // si retorna el toquen
            res.status(200).json({
                token
            });
            console.log("token: ",token);
            
        }catch(e){// Si nos devuelve un error
            // Mostramos el error
            console.error(e);
            // Respondemos al server
            res.status(401).json({
                msg: "Invalid credentials"
            })
        }
    });

////////////////////////////////////////////////////////////////
// });

///////////////////////////////////////////////////////////////
// Exportamos las rutas
export default router;