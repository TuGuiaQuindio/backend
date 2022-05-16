// API PARA OBTENER LOS DOCUMENTOS A SUBIR

import express from 'express';
/////////////////////////////////////////////////////
//IMPORTAMOS PATH
import path from '../paths';
/////////////////////////////////////////////////////
//IMPOTAMOS CONTROLADORES
import { uploadFile } from '../../controllers/Guide/file.upload.controller';
/////////////////////////////////////////////////////
//IMPORTAMOS EL AUTENTIFICADOR
import { isAuth } from '../../middleware/auth';
/////////////////////////////////////////////////////
///IMPORTAMOS VALIDADORES
import validatorJwt from '../../validator/jwt.validator';
/////////////////////////////////////////////////////
//IMPORTAMOS LIBRERIAS
import upload from '../../libs/multer';
// import { storage_Guide } from '../../libs/multer';
//Obtenemos router
const router = express.Router();

//Decosntruimos
const { params, validate } = validatorJwt;

/**
 * Subir archivos
 * 
 */
router.route(path.guideUploadPhoto)
	.get()
	.post(params, validate, isAuth, upload.single('myFile'), uploadFile);

/////////////////////////////////////////////////////
export default router;