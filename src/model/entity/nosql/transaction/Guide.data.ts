import 'reflect-metadata';
/////////////////////////////////////////
//IMPORTAR CONECCION A LA DB
import { MongoDatasource as dsource } from '../../../../config/datasources';
/////////////////////////////////////////
//IMPORTAMOS ENTIDADES
import { Guide } from '../Guide.mongo'; 
import { Information } from '../Guide-Information.mongo';
import { Language } from '../Guide-lenguage.mongo';
////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { GuideSignup_extra } from '../../../../interface/Guide/signup-guide.extra';

//Transacion de datos 
//Se encarga de actualizar los datos de usuario


//Guardamos los datos de usuario GUIDE extras
export const createGuideInfo = async ( values : GuideSignup_extra ) => {
	
	//Get Data
	const data = {
		lenguaje : values.information?.langueges,

		theme : values.information?.theme

	};
	console.log('CREANDO INFO GUIDE...');
	try {
		//Create User-Guide
		const newGuideInfo = new Guide();
		newGuideInfo.document = '24';
		newGuideInfo.info = new Information();
		newGuideInfo.info.theme = 'Dark';
		newGuideInfo.info.languages = [new Language('Ingles',6)];
		
		//TODO-> ERROR EN CREAR, REPOSITORY es el error
		const createGuide = dsource.getMongoRepository(Guide).create(newGuideInfo);
		console.log('INFO GUIDE CREADO...');

		const resultsGuide = dsource.getMongoRepository(Guide).save(createGuide);
		console.log('Guide MONGODB :: ',resultsGuide);
	} catch (error) {
		//MOstramos el error
		console.log(error);
		return false;
		
	}
	
	
	//Retornamos > Todo Salio Bien
	return true;

};