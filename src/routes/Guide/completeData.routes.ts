//COMPLEtAR DATOS
import express, { Router } from 'express';
//////////////////////////////////////////////
//IMPORTAMOS PATH
import path from '../paths/index';
//////////////////////////////////////////////
//IMPORTAMOS CONTROLADORES
import { completeData_post } from '../../controllers/Guide/completeData.controller';
//////////////////////////////////////////////
//IMPORTAMOS VALIDADRES

//////////////////////////////////////////////
//IMPORTAMOS AUTH
import { isAuth } from '../../middleware/auth';
//////////////////////////////////////////////

//Contruiir ruta
const router : Router = express.Router();


router.route(path.completeDataGuide)
	.post( isAuth, completeData_post );

////////////////////////////////////////////////////
//EXPORTAMOS
export default router;
