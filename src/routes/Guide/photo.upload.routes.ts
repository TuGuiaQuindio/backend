// API PARA OBTENER LOS DOCUMENTOS A SUBIR

import express from 'express';
/////////////////////////////////////////////////////
//IMPORTAMOS PATH
import path from '../paths';
/////////////////////////////////////////////////////
//IMPOTAMOS CONTROLADORES
import { uploadPhoto } from '../../controllers/Guide/photo.upload.controller';
/////////////////////////////////////////////////////
//IMPORTAMOS LIBRERIAS
import upload from '../../libs/multer';
//Obtenemos router
const router = express.Router();

/**
 * Subir archivos
 * 
 */
router.route(path.guideUploadPhoto)
	.get()
	.post(upload.single('myFile'), uploadPhoto);

/////////////////////////////////////////////////////
export default router;