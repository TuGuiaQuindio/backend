import { DataApplicantVacancy } from '../../interface/Company/data';
import { addApplicant, getVacancies, getVacancyId } from '../../model/entity/nosql/transaction/vacancies';

//Mostrar todas las vacantes
export const showVacanciesService = async () => {
	//Buscamos todas las vacantes
	const vacancies = await getVacancies();
	//Validamos la respuesta 
	if (vacancies === false)return false;//ERROR en obtener las vacantes
	if(vacancies.length === 0)return null;//Vacantes vacios
	//ALL OK
	console.log('VACANTES DIPONIBLES: ',vacancies);
	return vacancies;
};

//Guardamos datos aplicante de la vacante
export const saveDataApplicant = async (idVacancy:string, values:DataApplicantVacancy):Promise<boolean|null> => {
	//validamos si la vacante existe
	const foundVacancy = await getVacancyId(idVacancy);
	if(!foundVacancy) return null; //Vacante no existe
	//Agregamos datos
	const resultAddData:boolean = await addApplicant(idVacancy, values);
	//retornamos respuesta
	return resultAddData;
};