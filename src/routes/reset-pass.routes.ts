//API PARA RESETEAR CONTRASEÑA
import express from 'express';
//////////////////////////////////////////////////////
//IMPORTAMOS PATH
import path from './paths/index';
/////////////////////////////////////////////////////
//IMPORTAMOS CONTROLLER
import { resetPass_post, resetPass_get} from '../controllers/resetPass.controller';
//////////////////////////////////////////////////////
//IMPORTAMOS VALIDADORES
import validator from '../validator/resetPass';
//////////////////////////////////////////////////////
//Construimos rutas
const router = express.Router();

// Deconstruimos
const { params, validate } = validator;
//Ruta de confirmacion de codigo y reset pass
router.route(path.resetPass)
	.get(resetPass_get)
	.put(params, validate, resetPass_post);

//////////////////////////////////////////////////////
export default router;