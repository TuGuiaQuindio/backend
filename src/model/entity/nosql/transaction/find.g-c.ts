// BUSCAR GUIAS Y EMPRESAR
// SEARCH ALL
// SEARCH ONE
//////////////////////////////////////////
//IMPORTACIONES CONECCIONES

//////////////////////////////////////////
// IMPORTACIONES DE NOSQL-TRANSACTION
import GuideInfoModel from '../Guide-info';
//////////////////////////////////////////

//!Encontrar todos los GuideInfoModel registrados
export const getGuideInfoAll = async () => {
	return await GuideInfoModel.find();
};

//!Buscar por documento 
//Encontrar un unico GuideInfo por Documento
export const getGuideInfoOne = async (document : number) => {
	return await GuideInfoModel.findOne({document});
};