// BUSCAR GUIAS Y EMPRESAR
// SEARCH ALL
// SEARCH ONE
//////////////////////////////////////////
//IMPORTACIONES CONECCIONES

//////////////////////////////////////////
// IMPORTACIONES DE NOSQL-TRANSACTION
import GuideInfoModel from '../Guide/GuideInfo';
import CompanyInfoModel from '../Company/CompnayInfo';
//////////////////////////////////////////


//! /////////////////////////////////////////////////////////////////
//! /////////////////////////////////////////////////////////////////
// ! GUIDE
//!Buscar por -> ID <-
//Encontrar un unico GuideInfo por Documento
export const getGuideInfoOne = async (id : number) => {
	return await GuideInfoModel.findOne({id});
};

//!Encontrar -> todos <- los GuideInfoModel registrados
export const getGuideInfoAll = async () => {
	return await GuideInfoModel.find();
};

//! /////////////////////////////////////////////////////////////////
//! /////////////////////////////////////////////////////////////////
// ! COMPANY
export const getCompanyInfoOne = async ( id : number ) => {
	return await CompanyInfoModel.findOne({id});
};
