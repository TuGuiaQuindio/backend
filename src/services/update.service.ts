// Actualizamos datos de tipo de usuario
////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { GuideSignup_extra } from '../interface/Guide/signup-guide.extra';
////////////////////////////////////////////////
//IMPORTAMOS DE TRANSACTIONS SQL
import { getGuideId } from '../model/entity/sql/transaction/find.g-c';
import { updateGuide } from '../model/entity/sql/transaction/guide';
//IMPORTAMOS DE TRANSACTIONS NoSQL
import { createGuideInfo } from '../model/entity/nosql/transaction/Guide.data';
////////////////////////////////////////////////
export const updateData  = async (values : GuideSignup_extra, type : 'mysql' | 'mongodb') => {
	//Actualizar datos
	//VALIDAMOS EL TIPO DE USUARIO
	if(type === 'mysql'){
		//Definimos el tipo de usuario 'GUIDE'
		values = values as GuideSignup_extra;
		console.log('******** Update Service MySQL ************');
		console.log('GET DATA FOR MySQL:: ', values);
		
		//Convertimos el id en Numerico
		const id : number | undefined = values.id;
		//Validamos si exite
		if(!id) return false;
		/**
		 * Validamos si el usuario guia exite
		 *  */
		//Buscamos por el id 
		const resultsGuide = await getGuideId(id);
		//Validamos si lo encontro
		if(!resultsGuide){
			// User NO exite
			console.log('Results :: ',resultsGuide);
			//Undefined ->No exite
			return undefined;
		}
		// User SI Exite
		console.log('Results :: ',resultsGuide);
		//send data to update
		const dataUpdate : boolean = await updateGuide( id, resultsGuide, values);
		//Retornamos con la respuesta
		// ->todo salio correcto
		return dataUpdate;
	}
	//MONGO
	else if(type === 'mongodb'){
		//
		values = values as GuideSignup_extra;
		console.log('********* Update Service MongoDB **********');
		console.log('GET DATA FOR MongoDB :: ', values);
		
		//Creamos la informacion del guia
		const resultsGuide = await createGuideInfo(values);
		console.log('Service resultsGuide :: ',resultsGuide);
		
		//False 
		if (!resultsGuide){ return false; }
		//True
		// return resultsGuide;
	}
};