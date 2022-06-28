import express, { Router }  from 'express';
//////////////////////////////////////////////////////////
//IMPORTAMOS PATH
import path from '../paths/index';
//////////////////////////////////////////////////////////
//IMPORTAMOS AUTENTIFICADOR 
import { isAuth } from '../../middleware/auth';
//////////////////////////////////////////////////////////
//IMPORTAMOS CONTROLADOR
import { showProfiles } from '../../controllers/Company/showProfileGuide.controller';
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

//Constuimos rutas
const router : Router = express.Router();

router.route(path.showProfileGuides)
	.get(isAuth, showProfiles);
//////////////////////////////////////////////////////////
export default router;