import multer from 'multer';

//Se crea el storage
const storageGuide : multer.StorageEngine = multer.diskStorage({
	//Definimos el destino
	destination : function (req, file, cd ){
		cd(null,'uploads/guide');
	},
	//Definimos cual sera el nombre del archivo
	filename : function (req, file, cd){
		cd(null, file.originalname);
	},
});

const upload : multer.Multer = multer({ storage : storageGuide });

export default upload;