//////////////////////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { NumberVacantes } from '../../constants/constants';
import { DataVacancy, Vacancy } from '../../interface/Company/data';
import { addVacancies } from '../../model/entity/nosql/transaction/companyInfo';
//////////////////////////////////////////////////////////////////
//IMPORTAMOS ENTIDADES
import { createVacancy } from '../../model/entity/nosql/transaction/companyVacancies';
import { getCompanyInfoOneId } from '../../model/entity/nosql/transaction/find.g-c';
import { Company } from '../../model/entity/sql/Company';
import { getCompanyId } from '../../model/entity/sql/transaction/find.g-c';
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


export const createVacancyService = async ( id:number,values:Vacancy, accessPermit:[] ) => {
	//
	console.log('ID: ',id, '\n->',values,'\n',);
	//OBTENEMOS EL PERMISO PARA SABER CUAL TIENE
	const access: string|null = getAccess(accessPermit);
	//Validamos
	//ACCESO FREE 
	if(access == 'FREE'){
		console.log('ACCESS FREE');		
		console.log('Busacndo Empresa...');
		const companyFound : Company|null = await getCompanyId(id);
		//Obtenemos datos adicionales
		//Validamos que exista
		if (!companyFound) return null;
		//TODO->IR CONTANTO EL NUMERO DE VACANTES PARA SABER CUANTAS PUEDE TENER
		//Validar cuantas vacantes han sido creadas con el mismo id
		const resultCompany = await getCompanyInfoOneId(id);
		//Validamos que exista
		if(!resultCompany)return null;
		//Obtenemos la lista de las vacantes
		const accessPermit:object[] = resultCompany.vacancies;
		console.log('List permisses: ',accessPermit);		
		//Validar la longtud de la lista de vacantes
		if(accessPermit.length > NumberVacantes.FREE){
			//Se restrige la creacion de vacantes
			//Retornamos que no tiene acceso
			return;
		}

		console.log('Company found EMAIL: ',companyFound);
		//Se crea la vacante
		const resultNewVacancy : DataVacancy = newVacancy(id,values,companyFound);
		//Se crea y guarda en MongoDB
		const resultVacancy = await createVacancy(resultNewVacancy);
		if (!resultVacancy) return false;//ERROR en crear vacante
		//Se guarda el ObjectId en la lista
		const objectIdVacancy:object = resultVacancy._id;
		//Agregamos objeto 
		const resultAddVacancy:boolean = await addVacancies(id,objectIdVacancy);
		//TODO->VALIDAR QUE LOS PERMISOS FUNCIONEN, QUE SOLO CREE 3 SI ES FREE
		if(!resultAddVacancy) return false; //ERROR EN agregar a lista vacante
		return true;
	}
	//ACCESO DIFERENTE
	console.log('DIFFERENT ACCESS');
	


};


//Crear objeto
function newVacancy(id:number, values:Vacancy, companyFound:Company){

	//Obtenemos la hora creando el objeto
	const dataTime = new Date().toUTCString();//Para universal
	//Crear nueva vacante
	const newVacancy : DataVacancy  = {
		idCompany: id,
		title: values.title,
		description: values.description,
		salary: values.salary,
		schedule: values.schedule,
		nameCompany: companyFound.nameCompany,
		// email: companyFound.rol.email,
		phoneNumber: companyFound.phoneNumber,
		address: companyFound.address,
		publishedOn: dataTime 
	} as unknown as DataVacancy;

	//Retornamos
	return newVacancy;
}

const getAccess = (accessPermit:[]): string|null => {
	//TIPO temporal
	type AccessType = { access:string };
	//Bandera
	let access = null;
	for(const obj of accessPermit){
		access = obj as AccessType;	
	}
	if (!access) return null;
	//Retornamos permisos
	return access?.access;
};