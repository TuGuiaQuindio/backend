// COMPANY
// Actualizamos datos de tipo de usuario
////////////////////////////////////////////////
//IMPORTACIONES DE INTERFACES
import { DataSql, DataNoSql } from '../../interface/Company/data-sql';
////////////////////////////////////////////////
//IMPORTAMOS DE TRANSACTIONS SQL
import { getCompanyId } from '../../model/entity/sql/transaction/find.g-c';
import { updateCompany } from '../../model/entity/sql/transaction/company';
////////////////////////////////////////////////
//IMPORTAMOS DE TRANSACTIONS NoSQL
import { getCompanyInfoOne } from '../../model/entity/nosql/transaction/find.g-c';
import { createCompanyInfo, updateCompanyInfo } from '../../model/entity/nosql/transaction/company';
////////////////////////////////////////////////
//IMPORTAMOS ENTIDADES
import { Company } from '../../model/entity/sql/Company';
////////////////////////////////////////////////

// SQL -> MySQL
export const updateDataSql = async ( values : DataSql  ) : Promise<boolean | undefined> => {
	//Actualizar datos
	console.log('****** Entry Update company Service MySQL ******');
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
export const updateDataNoSql = async ( values : DataNoSql ) : Promise<boolean | undefined> => {
	//Actualizar datos

	console.log('****** Entry Update company Service Mongo ******');
	// console.log('## Datos recibidos ## \n', values);
	//Buscamos si la informacion existe
	console.log('*SEARCHING por este id->',values.id);
	//Buscamos si existe la informacion 
	const results = await getCompanyInfoOne(values.id);
	//Show results
	console.log(results);
	//Validamos
	if (results) {
		// if User exits -> Data Update
		const update : boolean = await updateCompanyInfo(values);
		//Si ocurre un error
		if(!update) return false;
		//SI TODO OK
		return true;
	}
	//Else User not exits -> Create Data
	//Creamos la informacion
	const createInfo : boolean = await createCompanyInfo(values);
	console.log('Service Results Company :: ', createInfo);
	//Validamos 
	if(!createInfo) return false;//Ocurrio un error
	//-> Todo OK
	return true;
};

