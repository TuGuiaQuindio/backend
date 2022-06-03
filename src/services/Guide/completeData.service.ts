
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
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

export const completeDataService = async ( id : number, values : CompleteData ) : Promise<boolean|null> => {
	//
	console.log('**** COMPLETE DATA ****');
	
	//Validamos que exista el asuario por el ID
	const guideFound : Guide|null = await getGuideId(id);
	if(!guideFound){
		//NO existe
		return null;
	}
	//Transaccionar los datos
	const resultIs : boolean = await insertGuideData(id,values);
	//VALIDAMOS EL RESULTADO
	if (!resultIs) {
		//Algo salio mal
		return false;
	}
	//ALL OK
	return true;	
};