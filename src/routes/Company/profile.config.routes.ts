// IMPORTAMOS EXPRESS
import express from 'express';
///////////////////////////////////////
//IMPORTACIONES DE PATHS
import path from '../paths';
///////////////////////////////////////////////
//IMPORTAMOS EL AUTENTIFICADOR
import { isAuth } from '../../middleware/auth';
///////////////////////////////////////
//IMPORTACIONES DE CONTROLADORES
import { profileConfig_put } from '../../controllers/Company/profile.config.controller';
///////////////////////////////////////
// Obtener rutas
const router = express.Router();

////////////////////////////////////////
/**
 * Configuracion de datos de Empresas
 */

router.route(path.CompanyProfileConfig)
	.get()
	.put(isAuth, profileConfig_put);

/////////////////////////////////////////////////////////////////////////////
//Exportamos
export default router;