// Requerimos express
import express from 'express';
import path from "./paths";
import { User } from "../interface/user";
import { Request, Response } from 'express';
import authSrv from "../services/auth";

const router = express.Router();
////////////////////////////////////////////////////////////////
/**
 * ----> LOGIN <----
 */
router.route(path.login)
    .get((req:Request, res:Response) => {
        res.send("Hi from Login -GET !!");
    })
    .post( async (req:Request, res:Response) => {
        // Ontenemos los datos del body
        const { email, password } = req.body as User;
        try{
            // obtenemos el token
            const token = await authSrv.login(email, password);
            // si retorna el toquen
            res.status(200).json({
                token
            });
        }catch(e){// Si nos devuelve un error
            // Mostramos el error
            console.error(e);
            // Respondemos al server
            res.status(401).json({
                msg: "Invalid credentials"
            })
        }
    });

/**
 * Resgistro
 */
router.route(path.register)
    .get((req:Request, res:Response)=>{

    })
    .post((req:Request, res:Response)=>{

    })



////////////////////////////////////////////////////////////////
// });

///////////////////////////////////////////////////////////////
// Esportamos las rutas
export default router;