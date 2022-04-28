
import express from 'express';
///////////////////////////////////////
//IMPOTACIONES DE PATHS
import path from '../paths/index';
//////////////////////////////////////
//IMPORTACIONES DE VALIDADORES
import signUpValidator from '../../validator/company-signup';
////////////////////////////////////////////
//IMPORTACIONES DE CONTROLADORES
import { companySignup_get, companySignup_post } from '../../controllers/Company/company.controller'; 
// Obtenemos las rutas
const router = express.Router();
/////////////////////////////////////////////////
/**
 * Registro de Empresa
 */
const { params, validate } = signUpValidator;
// RUTA '/company/signup'
router.route(path.registerCompany)
	.get(companySignup_get)
	.post(params, validate, companySignup_post );

////////////////////////////////////////////////////7
// Exportamos las rutas
export default router;