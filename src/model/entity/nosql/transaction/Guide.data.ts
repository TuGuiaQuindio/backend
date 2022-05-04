import 'reflect-metadata';
/////////////////////////////////////////
//IMPORTAR CONECCION A LA DB
import { getMongoManager } from 'typeorm';
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
export const createGuideInfo = async ( values : GuideSignup_extra ) : Promise<boolean> => {
	
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
		newGuideInfo.info.languages = [
			new Language('English', 0),
			new Language('English', 0),
			new Language('English', 0),
		];

		//TODO-> ORGANIZAR ERROR, ERROR Create Mongo-Info:  TypeError: Cannot convert undefined or null to object
		console.log('Saving an new USER-GUIDE');
		console.log(newGuideInfo);
		console.log(dsource.options);
		const repository = dsource.getMongoRepository(Guide);
		const result = repository.create(newGuideInfo);
		await repository.save(result);
		// const manager = await dsource.mongoManager.save(newGuideInfo);
		// const manager = await dsource.manager.save(newGuideInfo);
		console.log('Saved an new user-Guide with id : ', newGuideInfo.id);
		console.log(result);
		
	} catch (error) {
		//MOstramos el error
		console.log('ERROR Create Mongo-Info: ',error);
		return false;
		
	}
	//Retornamos > Todo Salio Bien
	return true;

};