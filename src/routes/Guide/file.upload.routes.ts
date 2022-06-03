// API PARA OBTENER LOS DOCUMENTOS A SUBIR

import express from 'express';
/////////////////////////////////////////////////////
//IMPORTAMOS PATH
import path from '../paths';
/////////////////////////////////////////////////////
//IMPOTAMOS CONTROLADORES
import { uploadFile_post } from '../../controllers/Guide/file.upload.controller';
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

const nameFile = upload.single('myFile');

/**
 * Subir archivos
 * 
 */
router.route(path.guideUploadPhoto)
	.get()
	.post(params, validate, isAuth, nameFile, uploadFile_post);

/////////////////////////////////////////////////////
export default router;