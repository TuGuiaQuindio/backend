import express from 'express';

/////////////////////////////////////////////////////////
//IMPORTAMOS PATHS
import path from './paths';
////////////////////////////////////////
//IMPORTAMOS VALIDADORES
import signUpValidator from '../validator/guide-signup';
////////////////////////////////////////
//IMPORTAMOS CONTROLADORES
import { guideSignup_get, guideSignup_post } from '../controllers/guide.controller';

const router = express.Router();
///////////////////////////////////////////////
/**
 * Registro de Guias
 */
// Deconstruimos lel objeto
const { params, validate } = signUpValidator;
// RUTA -> '/signup/guide'
router.route(path.registerGuide)
	.get(guideSignup_get)
	.post(params,validate,guideSignup_post);

// Rutas con parametros
router.route('/guide/:id')
	.get()
	.put()
	.delete();


///////////////////////////////////////////////////////////////
// Exportamos las rutas
export default router;