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
import { profileConfig_put, getProfileData } from '../../controllers/Guide/profile.config.controller'; 
//////////////////////////////////////////////
// construimos rutas
const router = express.Router();    

//////////////////////////////////////////////
//Deconstrucción
const { params, validate } = validatorJwt;

/**
 * Configuracion del perfil GUIDE
 */
router.route(paths.guideProfileConfig)
	//Pasar los datos
	.get(isAuth, getProfileData)
	//Actualizar datos
	.put( params, validate, isAuth, profileConfig_put );

////////////////////////////////////////////////////////////////
//exportamos rutas 
export default router;