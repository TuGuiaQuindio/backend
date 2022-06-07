//////////////////////////////////////////////////////////////////////////////
//IMPORTAMOS ENTIDADES
//NoSQL
import { createCompanyInfo, updateCompanyInfo } from '../../model/entity/nosql/transaction/company';
//SQL
import { Company } from '../../model/entity/sql/Company';
import { updateDataNew } from '../../model/entity/sql/transaction/company';
import { getCompanyId } from '../../model/entity/sql/transaction/find.g-c';
//////////////////////////////////////////////////////////////////////////////
//IMPORTAMOS TRANSACIONES

//////////////////////////////////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { CompleteDataSql, DataNoSql } from '../../interface/Company/data-sql';
import { getCompanyInfoOne } from '../../model/entity/nosql/transaction/find.g-c';

//////////////////////////////////////////////////////////////////////////////
//Insertamos datos nuevos -> SQL
export const completeDataServiceSql = async (id : number, values : CompleteDataSql ) : Promise<boolean|null> => {
	console.log('**** COMPLETE COMPANY DATA SQL ****');
	const companyFound : Company|null = await getCompanyId(id);
	//Validamos que exista el asuario por el ID
	if(!companyFound) return null;//NO EXISTE
	//Transaccionar los datos
	//Guardar datos
	const responsetIs : boolean = await updateDataNew(id, values);
	//Retornamos resultado
	return responsetIs;
};

export const completeDataServiceNoSql = async ( id : number, values : DataNoSql  ) => {
	//
	//Los datos ya estan completos
	const completeData = true; //Estado true

	console.log('**** COMPLETE COMPANY DATA NoSQL ****');
	//Buscamos usuario si existe
	const companyDataFound = await getCompanyInfoOne(id);
	//Validamos 
	if(companyDataFound){
		//Transaccion de datos
		//Guardar datos
		const resultIs : boolean = await updateCompanyInfo(id, values, completeData);
		// Retornamos resultado
		//False -> Error en actualizar datos
		//True -> All ok
		return resultIs;
	} 
	//Compañia INFO no existe
	//Se crea info
	const createInfo : boolean = await createCompanyInfo(id, values, completeData);
	//False; Ocurrio un error
	//True: ALL ok
	return createInfo; 

};