//IMPORTAMOS INTERFACES
import { DataApplicantVacancy, DataCompany } from '../../interface/Company/data';
//IMPORTAMOS TRANSACCIONES
import { getInfoOne } from '../../model/entity/nosql/transaction/companyInfo';
import { addApplicant, getVacancies, getVacancyId } from '../../model/entity/nosql/transaction/vacancies';
import { getCompanyId } from '../../model/entity/sql/transaction/find.g-c';

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

//Obtener solo una vacante
export const getVacancy = async (idVacancy:string, email:string) => {
	//MOSTRAMOS OLO LA INDO DE LA VACANTE
	//Obtenemos la vacante
	const foundVacancie = await getVacancyId(idVacancy);
	console.log('DATA VACANCY: ',foundVacancie);
	//Validamos
	if(!foundVacancie)return null;//NO SE ENCONTRO
	//OBTENEMOS ID de la empresa
	const id:number = foundVacancie.idCompany;
	//Obtenemos la informacion de la empresa
	const foundInfo = await getInfoOne(id);
	console.log('DATA INFO COMPANY: ',foundInfo);
	//validamos 
	if(foundInfo===false)return false;//ERROR buscando info 
	if(foundInfo===null)return foundVacancie;//Datos INFO no encontrados
	//all ok
	const infoMysql =await getCompanyId(id);
	if(!infoMysql)return null;//No se encontro la info
	//creamos los datos de la empresa
	const data:DataCompany={
		id:id,
		mainActiviti:foundInfo.mainActivity,
		vacancies:foundInfo.vacancies,
		nameCompany:infoMysql.nameCompany,
		email:email,
		nit:infoMysql.nit,
		addres:infoMysql.address,
		phoneNumber:infoMysql.phoneNumber,
	} as DataCompany;
	//Lista de datos
	const list = [
		foundVacancie,
		data
	];
	console.log('LIST: ',list);
	
	//EXISTE
	return list;
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