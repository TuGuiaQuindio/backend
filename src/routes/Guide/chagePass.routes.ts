// Cambiar contraseña

import express from 'express';
///////////////////////////////////////////////
//IMPORTAMOS PATH
import path from '../paths/index';
///////////////////////////////////////////////
//IMPORTAMOS VALIDADORES
import validatorJwt from '../../validator/jwt.validator';
///////////////////////////////////////////////
//IMPORTAMOS MIDDLEWARES
import { isAuth } from '../../middleware/auth';
///////////////////////////////////////////////
//IMPORTAMOS CONTROLADORES
import { changePass_put } from '../../controllers/Guide/changePass.controller';
///////////////////////////////////////////////
//Construimos RUTA
const router = express.Router();

//DECONSTRUCCION
const { params, validate } = validatorJwt;

router.route(path.recoverPass)
	.put(params, validate, isAuth, changePass_put);

///////////////////////////////////////////////
//Export
export default router;