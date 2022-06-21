// BUSCAR GUIAS Y EMPRESAR
// SEARCH ALL
// SEARCH ONE
//////////////////////////////////////////
//IMPORTACIONES CONECCIONES

//////////////////////////////////////////
// IMPORTACIONES DE NOSQL-TRANSACTION
import GuideInfoModel from '../Guide/GuideInfo';
// import ImageGuideModel from '../Guide/Image';

import CompanyInfoModel from '../Company/CompanyInfo';
//////////////////////////////////////////


//! /////////////////////////////////////////////////////////////////
//! /////////////////////////////////////////////////////////////////
// ! GUIDE
//!Buscar por -> ID <-
//Encontrar un unico GuideInfo por Documento
export const getGuideInfoOneId = async (id : number) => {
	return await GuideInfoModel.findOne({id});
};

//!Encontrar -> todos <- los GuideInfoModel registrados
export const getGuideInfoAll = async () => {
	return await GuideInfoModel.find();
};
// !Encontrar por ->ID<- Imagen
export const getImgGuideId = async (id: number) => {
	return await GuideInfoModel.findOne({id});
};

//! /////////////////////////////////////////////////////////////////
//! /////////////////////////////////////////////////////////////////
// ! COMPANY
export const getCompanyInfoOneId = async ( id : number ) => {
	return await CompanyInfoModel.findOne({id});
};
