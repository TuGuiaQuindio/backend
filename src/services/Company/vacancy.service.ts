//////////////////////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { getNumberAccess } from '../../constants/constants';
import { DataVacancy, Vacancy } from '../../interface/Company/data';
import { addVacancies } from '../../model/entity/nosql/transaction/companyInfo';
//////////////////////////////////////////////////////////////////
//IMPORTAMOS ENTIDADES
import { createVacancy, delVacancyObjectId, getVacancyObjectId, updateVacancie } from '../../model/entity/nosql/transaction/vacancies';
import { getCompanyInfoOneId } from '../../model/entity/nosql/transaction/findInfo.g-c';
import { Company } from '../../model/entity/sql/Company';
import { getCompanyId } from '../../model/entity/sql/transaction/find.g-c';
//////////////////////////////////////////////////////////////////
//IMPORTAMOS SERVICIOS
import { getAccess } from '../permits.service';
import { ObjectId } from 'mongoose';
//////////////////////////////////////////////////////////////////

export const createVacancyService = async ( id:number,values:Vacancy, accessPermit:[] ) : Promise<boolean|null|undefined> => {
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
		//Obtener el numero de acuerdo al permisp
		const permitNumber:number = getPermitNumber(access);
		//Validar la longtud de la lista de vacantes
		if(accessPermit.length >= permitNumber){
			//Se restrige la creacion de vacantes
			//Retornamos que no tiene acceso
			console.log('NO TIENE PERMISOS PARA CREAR MAS VACANTES');
			return undefined;
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
	//Validar si es otro permiso
	// else if (access == 'PREMIUM'){}
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

const getPermitNumber = (access:string) : number => {
	//Obtenemos el objeto del permiso
	const permitNumber : number|undefined = getNumberAccess(access)?.NumberVacancies;
	//Validamos si es numerico
	if(!permitNumber) {
		console.log('undefined');
		return 1; 
	}
	return permitNumber;
};

//?Actualizar vacante
export const updateVacancyService = async (objectId:string, values:Vacancy) => {
	console.log('Valores a actualizar: ', values);
	//Validamos si existe la vacante
	const foundVacancy = await getVacancyObjectId(objectId);
	console.log('* ',foundVacancy);
	//Validamos que exista
	if(!foundVacancy)return null;
	// Actualizamos
	const result = await updateVacancie(objectId, values);
	//Validamos 
	if(!result)return undefined;
	console.log('-> ',result);
	return result;
};

//?Eliminar vacante de "vacancies"
export const deleteVacancyService = async (id:number, objectId:string):Promise<boolean|null> => {
	//Buscamos vacante si existe
	const foundVacancy = await getVacancyObjectId(objectId);
	console.log('vacancy found: ',foundVacancy);
	if(!foundVacancy)return null;//No encontrado
	//Eliminamos
	const result : boolean = await delVacancyObjectId(objectId);
	
	if(!result)return false;//Ocurrio un error eliminando vacante
	//*Eliminamos objectId de vacante en lista de vacantes 'companiInfos'
	//Obtenemos la informacion de la empresa 
	const companyInfo = await getCompanyInfoOneId(id);
	if(!companyInfo) return false;//Error buscando vacante
	console.log('*',companyInfo);
	console.log('VACANCIES[]= ',companyInfo.vacancies);
	const vacancies:ObjectId[] = companyInfo.vacancies as ObjectId[];
	
	//Validamos cada ObjectId
	for(const objId of vacancies){
		//Validamos cada ObjectId de la lista
		console.log('ObjectId= ',typeof objId);
		console.dir(objId);
		console.log('>> ',vacancies[0]);
		//Validamos si el objectId coincide
		//TODO-> VALIDAR LOS ObjectId que coincidan
		if(objectId){
			console.log('COINCIDE: ',objectId);
		}
	}
	//Actualizar lista de vacantes
	
	//TRUE  -> All ok
	//FALSE -> Error eliminando vacante 
	return result;
};
