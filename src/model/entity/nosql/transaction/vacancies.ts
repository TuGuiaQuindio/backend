///////////////////////////////////////////////////////////////
//IMPORTAMOS MODELO
import VacancyModel from '../Company/vacancy';
///////////////////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { DataVacancy } from '../../../../interface/Company/data';
///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////

//Crear vacante
export const createVacancy = async (values:DataVacancy) => {
	//
	console.log('Creando vacante...');
	//Centinela
	let resultVacancy = null ;
	try {
		//Creamos vacante
		const vacancy = new  VacancyModel({
			...values
		});
		//Guardamos vacante
		await vacancy.save();
		console.log('Result vacancy: ', vacancy);
		resultVacancy = vacancy;
	}catch (error) {
		console.log('ERROR en la creacion de vacante: ',error);
		return false;
	}
	//Retornamos
	return resultVacancy;
};

//Mostrar todas las vacantes
export const getVacancies = async () => {
	try {
		const allVacancies = await VacancyModel.find();
		return allVacancies;
	} catch (error) {
		console.log('ERROR en obtener las vacantes: ',error);
		return false;
	}
};


