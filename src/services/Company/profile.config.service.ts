// COMPANY
// Actualizamos datos de tipo de usuario
////////////////////////////////////////////////
//IMPORTACIONES DE INTERFACES
import { DataSql, DataNoSql, CompanyDataConfig } from '../../interface/Company/data';
////////////////////////////////////////////////
//IMPORTAMOS DE TRANSACTIONS SQL
import { getCompanyId } from '../../model/entity/sql/transaction/find.g-c';
import { updateCompany } from '../../model/entity/sql/transaction/company';
////////////////////////////////////////////////
//IMPORTAMOS DE TRANSACTIONS NoSQL
import { getCompanyInfoOneId } from '../../model/entity/nosql/transaction/findInfo.g-c';
import { createCompanyInfo, updateCompanyInfo } from '../../model/entity/nosql/transaction/companyInfo';
////////////////////////////////////////////////
//IMPORTAMOS ENTIDADES
import { Company } from '../../model/entity/sql/Company';
////////////////////////////////////////////////

// SQL -> MySQL
export const updateDataSql = async ( values : DataSql  ) : Promise<boolean | undefined> => {
	//Actualizar datos
	console.log('**** Entry Update company Service MySQL ******');
	//Obtenemos el id
	const id : number | undefined = values.id;
	//VAlidamos si exite 
	if(!id) return false;
	//Buscamos por el ID
	console.log('Buscando Empresa por el id...');
	const resultsCompany : Company | null = await getCompanyId(id);
	//Validamos si el usuario exite
	if (!resultsCompany){
		//User not exists
		console.log('Results :: ', resultsCompany);
		//Undefined ->No exite
		return undefined;
	}
	//User Exists
	//Update
	console.log('Results :: ', resultsCompany);
	//send data to update
	const dataUpdate : boolean = await updateCompany(id, values);
	return dataUpdate; 
};

// NoSQL -> MongoDB 
export const updateDataNoSql = async (id : number, values : DataNoSql ) : Promise<boolean | undefined> => {
	//Actualizar datos

	console.log('****** Entry Update company Service Mongo ******');
	// console.log('## Datos recibidos ## \n', values);
	//Buscamos si la informacion existe
	console.log('*SEARCHING por este id->',id);
	//Buscamos si existe la informacion 
	const results = await getCompanyInfoOneId(id);
	//Show results
	console.log(results);
	//Validamos
	if (results) {
		// if User exits -> Data Update
		const update : boolean = await updateCompanyInfo(id, values);
		//False; Ocurrio un error
		//True: ALL ok
		return update;
	}
	//Else User not exits -> Create Data
	//Creamos la informacion
	const createInfo : boolean = await createCompanyInfo(id, values);
	console.log('Service Results Company :: ', createInfo);
	//False; Ocurrio un error
	//True: ALL ok
	return true;
};


export const getData = async (id:number,email:string):Promise<CompanyDataConfig|null> => {
	//Validar si el usuario-empresa existe
	const dataCompany = await getCompanyId(id);
	//Validar si el usuario existe
	if(!dataCompany)return null;//No existe info
	
	//validamos si esta la informacion en mongo
	const dataCompanyMongo = await getCompanyInfoOneId(id);
	//Validar si existe la informacion
	// if(!dataCompanyMongo)return null;//No existe info
	//Obtenemos datos necesarios
	const data:CompanyDataConfig = {
		email:email,
		nit:dataCompany.nit,
		phoneNumber:dataCompany.phoneNumber,
		address:dataCompany.address,
		mainActivity:dataCompanyMongo?.mainActivity || null,
	}as CompanyDataConfig;

	return data;

	
};

