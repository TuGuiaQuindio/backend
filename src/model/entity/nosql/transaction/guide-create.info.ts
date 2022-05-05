/////////////////////////////////////////
// IMPORTAMOS MODEL
import GuideInfoModel from '../Guide-info'; 
/////////////////////////////////////////
//IMPORTAMOS ENTIDADES

//////////////////////////////////////////
//IMPORTAMOS INTERFACES
// 1. Create an interface representing a document in MongoDB.
import { GuideInfo } from '../../../../interface/Guide/guideInfo';

//Transacion de datos 
//Se encarga de actualizar los datos de usuario

//Guardamos los datos de usuario GUIDE extras
export const createGuideInfo = async ( values : GuideInfo ) : Promise<boolean> => {
	
	//Get Data
	// const data = {
	// 	id : values.id,
	// 	document : values.document,
	// 	information : values.information ,
	// 	lenguaje : values.information.langueges,
	// 	theme : values.information.theme
	// };
	console.log('CREANDO INFO GUIDE...');
	try {
		await executeQuery();
	} catch (error) {
		//MOstramos el error
		console.log('ERROR Create Mongo-Info: ',error);
		return false;
	}
	//Retornamos > Todo Salio Bien
	return true;
};
// Ejecutar un query
async function executeQuery() {
	//Create User-Guide
	const guideInfo = new GuideInfoModel({
		id : 1,
		information : {
			theme : 'Dark',
			language : [
				{
					name : 'English',
					experience : 4
				}
			],
		},
	});
	//Save Guide
	await guideInfo.save();
	//
	console.log(guideInfo);
}