import express, { Router }  from 'express';
//////////////////////////////////////////////////////////
//IMPORTAMOS PATH
import path from '../paths/index';
//////////////////////////////////////////////////////////
//IMPORTAMOS CONTROLADOR
import { showVacancies_get } from '../../controllers/Guide/showVacancies.controller'; 
//////////////////////////////////////////////////////////
//IMPORTAMOS AUTENTIFICADOR 
import { isAuth } from '../../middleware/auth';
//////////////////////////////////////////////////////////

//Constuimos rutas
const router : Router = express.Router();

//TODO -> APUNTARSE A LA VACANTE:EL GUIA 
router.route(path.showVacancies)
	.get(isAuth, showVacancies_get);

/////////////////////////////////////////////////////////
//importamos
export default router;
