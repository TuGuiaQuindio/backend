import express, { Router } from 'express';
//////////////////////////////////////////////
//IMPORTAMOS PATH
import path from '../paths/index';
////////////////////////////////////////////////////
//IMPORTAMOS CONTROLADORES
import { completeData_post } from '../../controllers/Company/completeData.controller';
////////////////////////////////////////////////////
//IMPORTAMOS VALIDADORES
import dataValidator from '../../validator/company/completeData.validator';
////////////////////////////////////////////////////
//IMPORTAMOS AUTH
import { isAuth } from '../../middleware/auth';
////////////////////////////////////////////////////

//Decosntruimos
const { params, validate } = dataValidator;

//!Construimos rutas
const router : Router = express.Router();

router.route(path.completeDataCompany)
	.post(params, validate, isAuth, completeData_post);

/////////////////////////////////////////////////////////////
//EXPORT 
export default router;