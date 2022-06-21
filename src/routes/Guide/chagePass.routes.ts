// Cambiar contraseña

import express, { Router } from 'express';
///////////////////////////////////////////////
//IMPORTAMOS PATH
import path from '../paths/index';
///////////////////////////////////////////////
//IMPORTAMOS VALIDADORES
import validatorJwt from '../../validator/jwt.validator';
import validatorData from '../../validator/changePass';
///////////////////////////////////////////////
//IMPORTAMOS MIDDLEWARES
import { isAuth } from '../../middleware/auth';
///////////////////////////////////////////////
//IMPORTAMOS CONTROLADORES
import { changePass_put } from '../../controllers/Guide/changePass.controller';
///////////////////////////////////////////////
//Construimos RUTA
const router : Router = express.Router();

//DECONSTRUCCION
//?Validador token
const { params, validate } = validatorJwt;
//?Validador campos Datos
const { paramsData, validateData } = validatorData;

router.route(path.changePassGuide)
/**
 * !PRIMERO
 * -> params , Validate = Son del token
 * -> paramsData , validateData = Son los campos
 */
	.put(params, validate, paramsData, validateData, isAuth, changePass_put);

///////////////////////////////////////////////
//Export
export default router;