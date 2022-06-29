//Aplicar a vacantes
import express, { Router } from 'express';
///////////////////////////////////////////////
//IMPORTAMOS PATH
import path from '../paths/index';
///////////////////////////////////////////////
//IMPORTAMOS VALIDADORES
import validatorJwt from '../../validator/jwt.validator';
///////////////////////////////////////////////
//IMPORTAMOS AUTH
import { isAuth } from '../../middleware/auth';
///////////////////////////////////////////////
//IMPORTAMOS CONTROLADORES
import { applyVacancy } from '../../controllers/Guide/apply.vacancy.controller';
///////////////////////////////////////////////
//Construimos RUTA
const router : Router = express.Router();

//DECONSTRUCCION
//?Validador token
const { params, validate } = validatorJwt;

router.route(path.applyVacancy)
	.post(params, validate,isAuth, applyVacancy);
///////////////////////////////////////////////////////////////////////////
export default router;