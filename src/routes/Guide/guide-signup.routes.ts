//RUTA DE SIGN-UP DE GUIDE
import express from 'express';

/////////////////////////////////////////////////////////
//IMPORTAMOS PATHS
import path from '../paths';
////////////////////////////////////////
//IMPORTAMOS VALIDADORES
import signUpValidator from '../../validator/guide/guide-signup';
////////////////////////////////////////
//IMPORTAMOS CONTROLADORES
import { guideSignup_post } from '../../controllers/Guide/guideSignUp.controller';

const router = express.Router();
///////////////////////////////////////////////
/**
 * Registro de Guias
 */
// Deconstruimos lel objeto
const { params, validate } = signUpValidator;
// RUTA -> '/signup/guide'
router.route(path.signupGuide)
	.post(params,validate,guideSignup_post);

///////////////////////////////////////////////////////////////
// Exportamos las rutas
export default router;