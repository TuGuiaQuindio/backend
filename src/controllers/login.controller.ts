//Controlador para el login

import { Request, Response } from 'express';
////////////////////////////////////////////////////////////////
// IMPORTACIONES DE SERVICIOS
import authSrv from "../services/auth.service";
////////////////////////////////////////////////////////////////
//IMPORTACIONES DE INTERFACES
import { User } from "../interface/user";
////////////////////////////////////////////////////////

// ->> RUTA GET
export const loginGet = (req:Request, res:Response) => {
    res.send("Hi from Login -GET !!!!");
}
////////////////////////////////////////////////////////////////
// ->>RUTA POST
export const loginPost = async (req:Request, res:Response) => {
    // Obtenemos los datos del body
        const { email, password } = req.body as User;
        try{
            // obtenemos el token
            const token = await authSrv.login(email, password);
            // si retorna el toquen
            // Si nos retorna un false es porque ocurrio un error
            if(token === false){
                // Respondemos al cliente
                return res.status(401).json({msg:"credenciales incorrectas"});
            // Por lo contrario repondemos
            }else{
                return res.status(200).json({
                    token
                });
                console.log("token: ",token);
            }
        }catch(e){// Si nos devuelve un error
            // Mostramos el error
            console.error(e);
            // Respondemos al server
            return res.status(401).json({
                msg: "Invalid credentials"
            })
        };
};   