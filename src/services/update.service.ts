// Actualizamos datos de tipo de usuario
////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { GuideSignup_extra } from '../interface/Guide/signup-guide.extra';
////////////////////////////////////////////////
//IMPORTAMOS DE TRANSACTIONS
import { getGuideId } from '../model/transactions/find-guide';
////////////////////////////////////////////////
export const updateData  = async (values : GuideSignup_extra, type : 'mysql' | 'mongodb') => {
	//Actualizar datos
	//VALIDAMOS EL TIPO DE USUARIO
	if(type === 'mysql'){
		//Definimos el tipo de usuario 'GUIDE'
		values = values as GuideSignup_extra;
		console.log('GET DATA FOR MySQL:: ', values);
		
		//Convertimos el id en Numerico
		const id : number = await convertStrNum(values.id);
		/**
		 * Validamos si el usuario guia exite
		 *  */
		//Buscamos por el id 
		const resultsGuide = await getGuideId(id);
		//Validamos si lo encontro
		if(!resultsGuide){
			// User NO exite
			console.log('Results :: ',resultsGuide);
			//FALSE->No exite
			return false;
		}
		// User SI Exite
		console.log('Results :: ',resultsGuide);
		//send data to update
		const dataUpdate = '' ;
		//Retornamos con la respuesta
		// ->todo salio correcto
		return true;
	}
	//MONGO
	else if(type === 'mongodb'){
		//
		values = values as GuideSignup_extra;
		console.log('GET DATA FOR MongoDB :: ', values);
		
	}
};

//Convertir string a numero
async function convertStrNum( data ?: string ) : Promise<number> {
	return Number(data);
}