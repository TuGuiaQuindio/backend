////////////////////////////////////////////////
// IMPORTAMOS MODEL
import GuideInfoModel from '../Guide/GuideInfo'; 
// import ImageGuideModel from '../Guide/Image';
////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { CompleteDataNoSql, GuideInfo, GuideInfoAdditional } from '../../../../interface/Guide/guideInfo';
////////////////////////////////////////////////
//Transacion de datos 
//Se encarga de actualizar los datos de usuario
//Guardamos los datos de usuario GUIDE extras
export const createGuideInfo = async ( id:number, values : GuideInfo ) : Promise<boolean> => {
	console.log('CREANDO INFO GUIDE...');
	try {
		await executeQuery(id, values);
	} catch (error) {
		//MOstramos el error
		console.log('ERROR Create Mongo-Info: ',error);
		return false;
	}
	//Retornamos > Todo Salio Bien
	return true;
};
// Ejecutar un query
async function executeQuery(id:number, values : GuideInfo) {
	console.log('Transactions: ', values.information);
	
	//Create User-Guide
	const guideInfo = new GuideInfoModel({
		id : id,
		information : {
			theme : values.information.theme,
			languages : values.information.languages,
		},
	});
	//Save Guide
	await guideInfo.save();
	//Show results
	console.log('GuideInfo Results : ',guideInfo);
}

////////////////////////////////////////////////////////////////
//ACTUALIZAR INFORMACION GUIA
export const updateGuideInfo = async ( id:number, values : GuideInfo, values2:GuideInfoAdditional ) : Promise<boolean> => {
	console.log('Actualizando Datos...');
	try {
		//Actualizamos los datos
		//TODO->ORGANIZAR los datos para actualizar
		const results = await GuideInfoModel.updateOne({id}, 
			{$set: 
				{information : 
					{
						theme: values.information.theme,
						languages: values.information.languages
					}
				},
			availability:values2.availability,
			aboutMe:values2.aboutMe,
			verified:values2.verified,
			firstAid:values2.firstAid
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

export const createDataInfo = async (id : number,values:CompleteDataNoSql, completeData : boolean) => {

	let bandera = null;

	//Actualizamos los datos
	try {
		const guideInfo = new GuideInfoModel({
			id : id,
			availability:values.availability,
			aboutMe:values.aboutMe,
			verified:values.verified,
			firstAid:values.firstAid,
			completeData
		});
		//Save Guide
		await guideInfo.save();
		console.log('Resultado de completar datos: ',guideInfo);
		bandera = true;
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

//?UPDATE COMPLETE DATA
export const updateCompleteData = async (id:number,values:CompleteDataNoSql):Promise<boolean> => {
	console.log('COMPLETANDO DATOS...');
	console.log('ID: ',id);
	try {
		const result = await GuideInfoModel.updateOne({id},
			{$set:
				{
					availability:values.availability,
					aboutMe:values.aboutMe,
					verified:values.verified,
					firstAid:values.firstAid,
				}
			
			});
		console.log(result);
	}catch(error) {
		console.log('ERROR actualizando datos - completeData: ',error);
		return false;
	}
	//ALL OK
	return true;
};

//?UPDATE VISIBILITY
export const updateVisibility = async (id:number, visibility:boolean):Promise<boolean> => {
	try {
		const result = await GuideInfoModel.updateOne({id},
			{
				$set: {
					visibility
				}
			});
		console.table(result);
	} catch (error) {
		console.log('ERROR actualizando visibility: ',error);
		return false;
	}
	return true;
};
