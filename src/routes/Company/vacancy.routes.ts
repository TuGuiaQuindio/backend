import express, { Router } from 'express';

//////////////////////////////////////////////////////////
//IMPORTAMOS CONTROLADORES
import { createVacancy_post, vacancy_put, vacancy_del } from '../../controllers/Company/vacancy.controller';
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

// TODO-> ACTUALIZAR ELIMINAR VACANTE
router.route(path.vacancy)
	//Crear vacante
	.post(isAuth, params, validate, createVacancy_post)
	//Actualizar vacante
	.put( isAuth, vacancy_put )
	//Eliminar 
	.delete(isAuth, vacancy_del);

//////////////////////////////////////////////////////////
//EXPORT
export default router;