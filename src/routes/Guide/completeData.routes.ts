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
import dataValidator from '../../validator/guide/completeData.validator';
//////////////////////////////////////////////
//IMPORTAMOS AUTH
import { isAuth } from '../../middleware/auth';
//////////////////////////////////////////////

//Deconstruccion de datos
const { params, validate } = dataValidator;

//Contruiir ruta
const router : Router = express.Router();


router.route(path.completeDataGuide)
	.post( params, validate, isAuth, completeData_post );

////////////////////////////////////////////////////
//EXPORTAMOS
export default router;
