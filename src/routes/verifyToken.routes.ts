//OBTENEMOS SOLO EL TOKEN

import express, { Router } from 'express';

////////////////////////////////////////////////////////////
//IMPORTAMOS PATH
import path from './paths/index';
////////////////////////////////////////////////////////////
//IMPORTAMOS CONTROLADORES
import { verifyTokenDecode } from '../controllers/verifyToken.controller'; 
////////////////////////////////////////////////////////////

//Contruimos ruta
const router : Router = express.Router();

router.route(path.verifyToken)
	.post(verifyTokenDecode);


////////////////////////////////////////////////////////////
//EXPORTAMOS
export default router;