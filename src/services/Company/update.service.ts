// COMPANY
// Actualizamos datos de tipo de usuario
////////////////////////////////////////////////
//IMPORTACIONES DE INTERFACES
import { DataSql, DataNoSql } from '../../interface/Company/data-sql';
////////////////////////////////////////////////
//IMPORTAMOS DE TRANSACTIONS SQL
import { getCompanyId } from '../../model/entity/sql/transaction/find.g-c';
////////////////////////////////////////////////
//IMPORTAMOS DE TRANSACTIONS NoSQL

////////////////////////////////////////////////
//IMPORTAMOS ENTIDADES
import { Company } from '../../model/entity/sql/Company';
////////////////////////////////////////////////

// SQL -> MySQL
export const updateDataSql = async ( values : DataSql  ) : Promise<boolean | undefined> => {
	//Actualizar datos

	console.log('****** Update company Service MySQL ******');
	//Obtenemos el id
	const id : number | undefined = values.id;
	//VAlidamos si exite 
	if(!id) return false;
	//Buscamos por el ID
	const resultsCompany : Company | null = await getCompanyId(id);
	//Validamos si el usuario exite
	if (!resultsCompany){
		//User not exists
		console.log('Results :: ', resultsCompany);
		return undefined;
	}
	//User Exists
	//Update
	const dataUpdate = true;

	return dataUpdate; 

};

// NoSQL -> MongoDB 
export const updateDataNoSql = async ( values : DataNoSql ) : Promise<boolean | undefined> => {
	//Actualizar datos

	console.log('****** Update company Service Mongo ******');
	
	return true;
};

