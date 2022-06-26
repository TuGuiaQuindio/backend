//GUIDE
/////////////////////////////////////////////////////
import { Request, Response } from 'express';
/////////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { GuideInfo } from '../../interface/Guide/guideInfo';
/////////////////////////////////////////////////////
//IMPORTAMOS SERVICIOS
import { pullApartMimetype, saveInfoImg } from '../../services/Guide/uploadImg.service';
import { saveInfoDoc } from '../../services/Guide/uploadDoc.service';
import { getResponse } from '../../services/response-message.service';
/////////////////////////////////////////////////////
//IMPORTAMOS CONTANTES
import { Roles } from '../../constants/constants';
/////////////////////////////////////////////////////
export const uploadFile_post = async (req : Request, res : Response) => {
	//Subir Archivos
	//OBTENEMOS TOKEN
	const { payload } = res.locals;
	//OBTENEMOS ID  
	const id : number = payload.id;
	//OBTENEMOS ROL
	const rol : number = payload.rol;
	console.log('-> Payload - Company :: ID :', id, '- ROl :',rol );
	//Validamos que el rol coincida
	// ROL COMPANY = 2
	if(rol != Roles.GUIDE) return res.status(403).json(getResponse('A002'));
	//VALIDAMOS EL ID 
	if(id == 0) return res.status(422).json({ error:'ID Not Found - Unauthorized' });
	//CONTINUA
	//Obtenemos los datos del cliente
	const { title, description } = req.body;
	//Obtenemos el tipo de Archivo
	const typeFile : string | undefined = req.file?.mimetype;	
	//Validamos se se obtiene
	if(!typeFile){return res.status(500).json({msg:'Tipo de archivo no conocido'});}
	//Obtenemos solo el tipo
	const getTypeFile : string = await pullApartMimetype(typeFile);
	//Validamos el tipo de Archivo
	if(getTypeFile == 'image'){
		// IMAGES
		infoImg(req, res, id, title, description);
	}else{
		// DOCUMENTS
		infoDocu(req, res, id, title, description);
	}
};

////////////////////////////////////////////////////////////////////
const infoDocu = async (req : Request, res : Response, id:number, title:string, description:string) => {
	//Obtenemos datos
	const data = {
		information : {
			documents : [
				{
					title : title,
					description : description,
					originalName : req.file?.originalname,
					size : req.file?.size,
					path : req.file?.path
				},
			]
		}
	} as GuideInfo;
	console.log('Data File Client: ', data);

	try {
		//Obtenemos el id
		const results : boolean | undefined | null = await saveInfoDoc(id,data);
		//Validamos respuesta
		if(results == null){
			//Undefined
			//Info no existe
			return res.status(404).json(getResponse('U002'));
		}else if(!results){
			//false
			//Datos ya existe
			return res.status(422).json(getResponse('U001'));
		}else if(results == undefined){
			//error en guardar en DB
			return res.status(500).json(getResponse('U003'));
		}
		//ALL OK
		return res.status(200).json(getResponse('U004'));
	} catch (err) {
		console.log(err);
		return res.status(500).json(getResponse('E001'));
	}
	
};


////////////////////////////////////////////////////////////////////
//Obtener datos y guardar datos
const infoImg = async ( req : Request, res : Response, id:number, title:string, description:string ) => {
	//Obtenemos los datos
	const data = {
		information : {
			images :[
				{
					title : title,
					description : description,
					originalName : req.file?.originalname,
					size : req.file?.size,
					path : req.file?.path
				},
			]
		}
	} as GuideInfo;
	console.log('Data File Client: ',data);
	//Guardar Informacion de la imagen
	try {
		const results : boolean | undefined | null = await saveInfoImg(id, data);
		//Validamos respuesta
		if(results == null){
			//Undefined
			//Info no existe
			return res.status(404).json(getResponse('U002'));
		}else if(!results){
			//false
			//Datos ya existe
			return res.status(422).json(getResponse('U001'));
		}else if(results == undefined){
			//error en guardar en DB
			return res.status(500).json(getResponse('U003'));
		}
		//ALL OK
		return res.status(200).json(getResponse('U004'));
	} catch (error) {
		console.log('ERROR :: ', error);
		return res.status(500).json(getResponse('E001'));
	}
};
