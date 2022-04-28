// RUTA para configuara perfil
import express from 'express';

//Importamos Controladores
///////////////////////////////////////////////
//IMPORTAMOS PATH
import paths from '../paths';
//////////////////////////////////////////////
//IMPORTAMOS VALIDADORES

///////////////////////////////////////////////
//IMPORTAMOS CONTROLADORES
import { profileConfig_get } from '../../controllers/Guide/profile.config.controller'; 
//////////////////////////////////////////////
// construimos rutas
const router = express.Router();    

//////////////////////////////////////////////

/**
 * Configuracion del perfil GUIDE
 */
router.route(paths.configProfile)
	.get(profileConfig_get)
	.post();

////////////////////////////////////////////////////////////////
//exportamos rutas 
export default router;