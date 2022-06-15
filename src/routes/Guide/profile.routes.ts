// RUTA para configuara perfil
import express from 'express';
//Importamos Controladores
///////////////////////////////////////////////
//IMPORTAMOS PATH
import paths from '../paths';
///////////////////////////////////////////////
//IMPORTAMOS EL AUTENTIFICADOR
import { isAuth } from '../../middleware/auth';
//////////////////////////////////////////////
///IMPORTAMOS VALIDADORES
import validatorJwt from '../../validator/jwt.validator';
////////////////////////////////////////////////////
//IMPORTAMOS CONTROLADORES
import { guideProfileGet } from '../../controllers/Guide/profile.controller';
//////////////////////////////////////////////
// construimos rutas
const router = express.Router();    
//////////////////////////////////////////////
//Deconstrucción
const { params, validate } = validatorJwt;
/**
 * Perfil GUIDE
 */
router.route(paths.guideProfile)
	.get(isAuth, guideProfileGet);
////////////////////////////////////////////////
export default router;