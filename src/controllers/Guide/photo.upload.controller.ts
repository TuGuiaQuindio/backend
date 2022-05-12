//GUIDE
/////////////////////////////////////////////////////
import { Request, Response } from 'express';
/////////////////////////////////////////////////////


export const uploadPhoto = async (req : Request, res : Response) : Promise<Response> => {
	//Subir Archivos

	//1)Validamos el id obtenido -> Headers
	//2) Validamos el rol obtenido -> Headers

	//Obtenemos los datos del archivo
	const { title, description } = req.body;
	
	return res.json({msg : 'saving photo'});

};

