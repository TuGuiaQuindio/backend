//////////////////////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { DataVacancy, Vacancy } from '../../interface/Company/data';
import { createVacancy } from '../../model/entity/nosql/transaction/companyVacancies';
//////////////////////////////////////////////////////////////////
//IMPORTAMOS ENTIDADES
import { Company } from '../../model/entity/sql/Company';
import { getCompanyId } from '../../model/entity/sql/transaction/find.g-c';
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


export const createVacancyService = async ( id:number,values:Vacancy, accessPermit:[] ) => {
	//
	console.log('ID: ',id, '\n->',values,'\n',);
	//TODO->OBTENEMOS EL PERMISO PARA SABER CUAL TIENE
	for(const obj of accessPermit){
		console.log('**',obj);
		const r : object = obj;
	}

	//TODO->1)Obtenemos datos adicionales 
	//TODO	(publishedIn, email company, phoneNumber, address )
	//Obtenemos datos adicionales
	const companyFound : Company|null = await getCompanyId(id);
	//Validamos 
	if (!companyFound) return null;
	//TODO->IR CONTANTO EL NUMERO DE VACANTES PARA SABER CUANTAS PUEDE TENER

	//TODO->2)Se crea la vacante
	//Se crea la vacante
	const resultNewVacancy : DataVacancy = newVacancy(id,values,companyFound);
	const resultVacancy:boolean = await createVacancy(resultNewVacancy);
	
	console.log('-> ',resultVacancy);
};

function newVacancy(id:number, values:Vacancy, companyFound:Company){

	const newVacancy : DataVacancy  = {
		idCompany: id,
		title: values.title,
		description: values.description,
		salary: values.salary,
		schedule: values.schedule,
		email: companyFound.rol.email,
		phoneNumber: companyFound.phoneNumber,
		address: companyFound.address
	} as unknown as DataVacancy;

	//Retornamos
	return newVacancy;
}