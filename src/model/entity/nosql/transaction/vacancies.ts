///////////////////////////////////////////////////////////////
//IMPORTAMOS MODELO
import VacancyModel from '../Company/vacancy';
///////////////////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { DataApplicantVacancy, DataVacancy, Vacancy } from '../../../../interface/Company/data';
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

//?UPDATE VACANCY
export const updateVacancie = async (objectId:string, values:Vacancy):Promise<boolean> => {
	try {
		const responseUpdate = await VacancyModel.findByIdAndUpdate({_id:objectId},{
			...values
		});
		console.log(responseUpdate);
	} catch (error) {
		console.error('Error: on update vacancy: ',error);
		return false;
	}
	//All ok
	return true;
};
//Mostrar todas las vacantes
export const getVacancies = async () => {
	try {
		const allVacancies = await VacancyModel.find();
		return allVacancies;
	} catch (error) {
		console.error('ERROR en obtener las vacantes: ',error);
		return false;
	}
};

//Buscar una vacante ObjectId
export const getVacancyObjectId = async (objectId:string) => {
	try {
		const vacancy = await VacancyModel.findOne({_id:objectId}); 
		console.log(vacancy);
		return vacancy;
	} catch (error) {
		console.error('ERROR actualizamdo vacante',error);
	}
	//ALL OK
	// return true;
};

//Buscar una vacante idVacancy
export const getVacancyId = async (idVacancy:string) => {
	try {
		const vacancy = await VacancyModel.findOne({id:idVacancy}); 
		console.log('Transaction: ',vacancy);
		return vacancy;
	} catch (error) {
		console.error('ERROR actualizamdo vacante',error);
	}
	//ALL OK
	// return true;
};

//Eliminamos una vacante por ObjectId
export const delVacancyObjectId = async (objectId:string):Promise<boolean> => {
	try{
		const result = await VacancyModel.findByIdAndDelete({_id:objectId});
		console.log('Delete result: ',result);
	}catch(error){
		console.error('ERROR eliminando vacante',error);
		return false;
	}
	//ALL OK
	return true;
};
//AGREGAR aplicante a la vacante
export const addApplicant = async (idVacancy:string, values:DataApplicantVacancy):Promise<boolean> => {
	try {
		const result = await VacancyModel.updateOne({id:idVacancy},
			{$addToSet:{
				applicants:
					values
			}
			});
		console.log('Result add data applicant: ',result);
	} catch (error) {
		console.log('ERROR: agregar aplicante a la vacante: ',error);
		return false;
	}
	return true;
};
