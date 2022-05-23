//API DE COAMBIAR CONTRASEÑA
import express, { Router } from 'express';
///////////////////////////////////////////////
//IMPORTAMOS PATH
import path from '../paths/index';
///////////////////////////////////////////////
//IMPORTAMOS MIDDLEWARES
import { isAuth } from '../../middleware/auth';
///////////////////////////////////////////////
//IMPORTAMOS CONTROLADORES
import { changePass_put } from '../../controllers/Company/changePass.controller';
///////////////////////////////////////////////
//IMPORTAMOS VALIDADORES
import jwtValidator from '../../validator/jwt.validator';
import dataValidator from '../../validator/changePass';
///////////////////////////////////////////////

//COntruimos router
const router: Router = express.Router();

//Deconstruccion
const { params, validate } = jwtValidator;
const { paramsData, validateData } = dataValidator;

router.route(path.changePassCompany)
/**
 * !PRIMERO
 * -> params , Validate = Son del token
 * -> paramsData , validateData = Son los campos
 */
	.put(params, validate, paramsData, validateData, isAuth, changePass_put);

///////////////////////////////////////////////
// EXPORT 
export default router;