////////////////////////////////////////////////
// IMPORTAMOS MODEL
import GuideInfoModel from '../Guide/GuideInfo'; 
// import ImageGuideModel from '../Guide/Image';
////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { GuideInfo } from '../../../../interface/Guide/guideInfo';
import { IsNull } from 'typeorm';
////////////////////////////////////////////////
//Transacion de datos 
//Se encarga de actualizar los datos de usuario
//Guardamos los datos de usuario GUIDE extras
export const createGuideInfo = async ( values : GuideInfo ) : Promise<boolean> => {
	console.log('CREANDO INFO GUIDE...');
	try {
		await executeQuery(values);
	} catch (error) {
		//MOstramos el error
		console.log('ERROR Create Mongo-Info: ',error);
		return false;
	}
	//Retornamos > Todo Salio Bien
	return true;
};
// Ejecutar un query
async function executeQuery(values : GuideInfo) {
	//Create User-Guide
	const guideInfo = new GuideInfoModel({
		id : values.id,
		information : {
			theme : values.information.theme,
			language : values.information.languages,
		},
	});
	//Save Guide
	await guideInfo.save();
	//Show results
	console.log('GuideInfo Results : ',guideInfo);
}

////////////////////////////////////////////////////////////////

//ACTUALIZAR INFORMACION GUIA
export const updateGuideInfo = async ( values : GuideInfo ) : Promise<boolean> => {
	console.log('Actualizando Datos...');
	//Obtenemos el id
	const id : number = values.id;
	try {
		//Actualizamos los datos
		const results : null | GuideInfo = await GuideInfoModel.findOneAndUpdate({id}, {
			information : {
				theme : values.information.theme,
				language : values.information.languages
			}
		});
		//Show Results
		console.log('RESULTS Update OK-> ',results);

	} catch (error) {
		console.log('ERROR updating DATA = ', error);
		return false;
	}
	//OK ALL
	return true;
};

//UPDATE DATA - completeData

export const createDataInfo = async (id : number, completeData : boolean) => {

	let bandera = null;

	//Actualizamos los datos
	try {
		const guideInfo = new GuideInfoModel({
			id : id,
			information : {
				theme : null,
				language : [],
			},
			completeData
		});
		//Save Guide
		await guideInfo.save();
		console.log('Resultado de completar datos: ',guideInfo);
		bandera = guideInfo;
	} catch (error) {
		console.log('ERROR al crear los datos, completeData: ',error);
		return false;
	}
	//ALL OK
	return bandera;
};

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// !IMAGENES
// ? Guardar informacion de Archivos -> Img
export const createInfoImg = async ( id: object, values : GuideInfo ) : Promise<boolean> => {
	console.log('FROM TRANSACTION');
	try {
		await executeQueryCreateInfoImg(id, values);
	} catch (err) {
		console.log('ERROR :: ',err);
		return false;
	}
	return true;
};
async function executeQueryCreateInfoImg(objId : object , values : GuideInfo){
	//Actualizamos datos
	const resultsInfo = await GuideInfoModel.findByIdAndUpdate(objId, { $push : { 'information.images': [...values.information.images]}});
	console.log(resultsInfo);
}


//Actualizamos la informacion de la imagen
export const updateInfoImg = async (id : number, values : GuideInfo) : Promise<boolean> => {
	//
	try {
		const results = 0;//await getGuideInfoOne(id);
		console.log('results guideInfo: : ',results);
		//TODO DEFINIMOS SI GUARDAR EL DATO
		console.log(values.information);
		await executeQueryUpdateInfoImg(id, values);
	} catch (err) {
		console.log(err);
	}
	return true;
};

async function executeQueryUpdateInfoImg(id : number, values : GuideInfo) {
	//
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//!DOCUMENTS
export const createInfoDoc = async (objId : object, values : GuideInfo) : Promise<boolean> => {
	console.log('FROM TRANSACTION');
	//Tratamos
	try {
		await executeQueryCreateInfoDoc(objId,values);
	} catch (err) {
		console.log('ERROR :: ',err);
		return false;
	}
	return true;
};
async function executeQueryCreateInfoDoc(objId : object, values : GuideInfo) {
	//Ingresamos datos
	const resultsInfo = await GuideInfoModel.findByIdAndUpdate(objId, { $push : { 'information.documents' : [...values.information.documents] } });
	console.log(resultsInfo);
}