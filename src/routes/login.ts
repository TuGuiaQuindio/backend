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
router.get(path.login, (req:Request, res:Response) => {
    res.send("Hi from Login -GET");

});

router.post(path.login, async (req:Request, res:Response) => {
    // Ontenemos los datos del body
    const { email, password } = req.body as User;
    // obtenemos el token
    const token = await authSrv.login(email, password);
});


////////////////////////////////////////////////////////////////
// });

///////////////////////////////////////////////////////////////
// Esportamos las rutas
export default router;