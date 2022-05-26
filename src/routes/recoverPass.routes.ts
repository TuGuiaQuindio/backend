//RECUPERAR CONTRASEÑA 
import express from 'express';
////////////////////////////////////////////////
//IMPORTAMOS PATH
import path from './paths/index';
////////////////////////////////////////////////
//IMPORTAMOS CONTROLLER
import { recoverPass_post } from '../controllers/recoverPass.controller';
////////////////////////////////////////////////
//IMPORTAMOS VALIDADORES
import validatorData from '../validator/recoverPass';
////////////////////////////////////////////////
//IMPORTAMOS AUTENTIFICADOR

////////////////////////////////////////////////
//Construimos rutas
const router = express.Router();

//Decostruimos
const { params, validate } = validatorData;

//Creamos API
router.route(path.recover)
	.post(params, validate, recoverPass_post);


////////////////////////////////////////////////
export default router;