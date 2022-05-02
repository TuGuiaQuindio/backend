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
//IMPORTAMOS VALIDADORES

///////////////////////////////////////////////
//IMPORTAMOS CONTROLADORES
import { profileConfig_put } from '../../controllers/Guide/profile.config.controller'; 
//////////////////////////////////////////////
// construimos rutas
const router = express.Router();    

//////////////////////////////////////////////

/**
 * Configuracion del perfil GUIDE
 */
router.route(paths.configProfilePut)
	.put( isAuth, profileConfig_put );

////////////////////////////////////////////////////////////////
//exportamos rutas 
export default router;