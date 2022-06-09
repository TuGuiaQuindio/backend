////////////////////////////////////////////////////////////////
//IMPORTAMOS TRANSACTIONS
import { insertGuideData } from '../../model/entity/sql/transaction/guide';
import { getGuideId } from '../../model/entity/sql/transaction/find.g-c';
////////////////////////////////////////////////////////////////
//IMPORTAMOS ENTIDADES
import { Guide } from '../../model/entity/sql/Guide';
////////////////////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { CompleteData } from '../../interface/Guide/guideInfo';
import { createDataInfo } from '../../model/entity/nosql/transaction/guide';
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

export const completeDataServiceSql = async ( id : number, values : CompleteData ) : Promise<boolean|null> => {
	//
	console.log('**** COMPLETE GUIDE DATA ****');
	const guideFound : Guide|null = await getGuideId(id);
	//Validamos que exista el asuario por el ID
	if(!guideFound)return null; // NO EXISTE
	//Transaccionar los datos
	const resultIs : boolean = await insertGuideData(id,values);
	//VALIDAMOS EL RESULTADO
	if (!resultIs) {
		//Algo salio mal
		return false;
	}
	//AGREGAMOS DATO A MONGO
	//Datos completos
	const completeData = true;
	const response = await createDataInfo(id,completeData);
	console.log('-> ',response);
	//ALL OK
	return true;	
};