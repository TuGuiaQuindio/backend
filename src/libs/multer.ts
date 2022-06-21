import multer from 'multer';
/////////////////////////////////////////////////////////////////
//IMPORTAMOS SERVICIOS
import { pullApartMimetype } from '../services/Guide/uploadImg.service';
/////////////////////////////////////////////////////////////////

//Se crea el storage
const storageGuide : multer.StorageEngine = multer.diskStorage({
	//Definimos el destino
	
	destination : async function (req, file, cd ){
		console.log('Info File :: ',file);
		//Obtenemos el tipo de archivo
		const getType : string | undefined = await pullApartMimetype(file.mimetype);
		//Validamos el tipo obtenido
		if(getType == 'image'){
			console.log('Type: ',getType);
			return cd(null,'uploads/guide/image');
		}
		console.log('Type: ',getType);
		return cd(null, 'uploads/guide/documents');
		
	},
	//Definimos cual sera el nombre del archivo
	filename : function (req, file, cd){
		cd(null, file.originalname);
	},
});


const upload : multer.Multer = multer({ storage : storageGuide });

export default upload;