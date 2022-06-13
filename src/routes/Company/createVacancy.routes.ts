import express, { Router } from 'express';

//////////////////////////////////////////////////////////
//IMPORTAMOS CONTROLADORES
import { createVacancy_post } from '../../controllers/Company/createVacancy.controller';
//////////////////////////////////////////////////////////
//IMPORTAMOS PATH
import path from '../paths/index';
//////////////////////////////////////////////////////////
//IMPORTAMOS VALIDADORES
import dataValidator from '../../validator/company/createVacancy.validator';
//////////////////////////////////////////////////////////
//IMPORTACIONES isAuth
import { isAuth } from '../../middleware/auth';
//////////////////////////////////////////////////////////

//Deconstruimos
const { params, validate } = dataValidator;

//Contruimos rutas
const router: Router = express.Router();

router.route(path.createVacancy)
	.post(isAuth, params, validate, createVacancy_post);

//////////////////////////////////////////////////////////
//EXPORT
export default router;