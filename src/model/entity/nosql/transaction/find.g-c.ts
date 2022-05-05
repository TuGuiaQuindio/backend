// BUSCAR GUIAS Y EMPRESAR
// SEARCH ALL
// SEARCH ONE
//////////////////////////////////////////
//IMPORTACIONES CONECCIONES

//////////////////////////////////////////
// IMPORTACIONES DE NOSQL-TRANSACTION
import GuideInfoModel from '../Guide-info';
//////////////////////////////////////////

//Encontrar todos los GuideInfoModel registrados
export const getGuideInfoAll = async () => {
	// connectDB();
	const results = await GuideInfoModel.find();
	// disconnection();
	return  results;
};

//!Buscar por documento 
//Encontrar un unico GuideInfo por Documento
export const getGuideInfoOne = async (document : string) => {
	return await GuideInfoModel.findOne({document});
};