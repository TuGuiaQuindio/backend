// IMPORTAMOS EXPRESS
import express from 'express';
///////////////////////////////////////
//IMPORTACIONES DE PATHS
import path from '../paths';
///////////////////////////////////////////////
//IMPORTAMOS EL AUTENTIFICADOR
import { isAuth } from '../../middleware/auth';
////////////////////////////////////////////
//IMPORTACIONES DE CONTROLADORES
import { getProfileData, profileConfig_put } from '../../controllers/Company/profile.config.controller';
///////////////////////////////////////}////////
///IMPORTAMOS VALIDADORES
import validatorJwt from '../../validator/jwt.validator';
////////////////////////////////////////////////////
// Obtener rutas
const router = express.Router();
////////////////////////////////////////
//Deconstruccion
const { params, validate } = validatorJwt;
/**
 * Configuracion de datos de Empresas
 */

router.route(path.CompanyProfileConfig)
	.get(isAuth, getProfileData)
	.put( params, validate, isAuth, profileConfig_put );

/////////////////////////////////////////////////////////////////////////////
//Exportamos
export default router;