////////////////////////////////////////////////
// IMPORTAMOS MODEL
import GuideInfoModel from '../Guide/GuideInfo'; 
////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { GuideInfo } from '../../../../interface/Guide/guideInfo';
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
////////////////////////////////////////////////////////////////
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