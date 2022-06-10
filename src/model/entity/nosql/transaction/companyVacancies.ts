///////////////////////////////////////////////////////////////
//IMPORTAMOS MODELO
import VacancyModel from '../Company/vacancy';
///////////////////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { DataVacancy } from '../../../../interface/Company/data';
///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////

//Crear vacante
export const createVacancy = async (values:DataVacancy) : Promise<boolean> => {
	//
	console.log('Creando vacante...');
	try {
		//Creamos vacante
		const vacancy = new  VacancyModel({
			...values
		});
		//Guardamos vacante
		await vacancy.save();
		console.log('Result vacancy: ', vacancy);
		console.log('#',typeof(vacancy._id));
		const data = vacancy._id;
		const r = data.split('(')[1];
		console.log(r);
		
		
		
	} catch (error) {
		console.log('ERROR en la creacion de vacante: ',error);
		return false;
	}
	//ALL OK
	return true;
};

