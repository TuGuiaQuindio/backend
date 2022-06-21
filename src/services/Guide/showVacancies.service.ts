import { getVacancies } from '../../model/entity/nosql/transaction/vacancies';


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