////////////////////////////////////////////////////////////////
//IMPORTAMOS TRANSACTIONS
import { insertGuideData } from '../../model/entity/sql/transaction/guide';
import { getGuideId } from '../../model/entity/sql/transaction/find.g-c';
////////////////////////////////////////////////////////////////
//IMPORTAMOS ENTIDADES
import { Guide } from '../../model/entity/sql/Guide';
////////////////////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { CompleteDataNoSql, CompleteDataSql } from '../../interface/Guide/guideInfo';
//IMPORTAMOS TRANSACCIONES
import { createDataInfo, updateCompleteData } from '../../model/entity/nosql/transaction/guide';
import { getGuideInfoOneId } from '../../model/entity/nosql/transaction/findInfo.g-c';
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

export const completeDataServiceSql = async ( id : number, values : CompleteDataSql ) : Promise<boolean|null> => {
	console.log('**** COMPLETE GUIDE DATA SQL ****');
	const guideFound : Guide|null = await getGuideId(id);
	//Validamos que exista el asuario por el ID
	if(!guideFound)return null; // NO EXISTE
	//Transaccionar los datos
	const resultIs : boolean = await insertGuideData(id,values);
	//VALIDAMOS EL RESULTADO
	if (!resultIs)return false;//Algo salio mal
	//AGREGAMOS DATO A MONGO
	//Datos completos
	const completeData = true;
	const response = await createDataInfo(id,completeData);
	console.log('-> ',response);
	//ALL OK
	return true;	
};

export const completeDataServiceNoSql = async (id:number, values:CompleteDataNoSql):Promise<boolean|null> => {
	console.log('**** COMPLETE GUIDE DATA NOSQL ****');
	const guideFound = await getGuideInfoOneId(id);
	//Validamos que exista el asuario por el ID
	if(!guideFound)return null; // NO EXISTE
	//AGREGAMOS DATOS A MONGO
	const result:boolean = await updateCompleteData(id,values);
	//VALIDAMOS EL RESULTADO
	// if (!result)return false;
	return result;
};