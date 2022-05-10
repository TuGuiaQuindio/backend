// GUIA
// Actualizamos datos de tipo de usuario
////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { GuideSignup_extra } from '../../interface/Guide/signup-guide.extra';
import { GuideInfo } from '../../interface/Guide/guideInfo';
////////////////////////////////////////////////
//IMPORTAMOS DE TRANSACTIONS SQL
import { getGuideId } from '../../model/entity/sql/transaction/find.g-c';
import { updateGuide } from '../../model/entity/sql/transaction/guide';
//IMPORTAMOS DE TRANSACTIONS NoSQL
import { createGuideInfo } from '../../model/entity/nosql/transaction/guide';
import { updateGuideInfo } from '../../model/entity/nosql/transaction/guide'; 
import { getGuideInfoOne } from '../../model/entity/nosql/transaction/find.g-c'; 
////////////////////////////////////////////////
//IMPORTAMOS ENTIDADES
import { Guide } from '../../model/entity/sql/Guide';
////////////////////////////////////////////////

//SQL -> MySQL
export const updateDataSql  = async (values : GuideSignup_extra) : Promise<boolean | undefined> => {
	//Actualizar datos
	//Definimos el tipo de usuario 'GUIDE'
	// values = values as GuideSignup_extra;
	console.log('******** Update GUIDE Service MySQL ************');
	console.log('GET DATA FOR MySQL:: ', values);
	//Obtenemos el id
	const id : number | undefined = values.id;
	//Validamos si exite
	if(!id) return false;
	/**
	 * Validamos si el usuario guia exite
	 *  */
	//Buscamos por el id 
	const resultsGuide : Guide | null  = await getGuideId(id);
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
	const dataUpdate : boolean = await updateGuide( id, values);
	//Retornamos con la respuesta
	// ->todo salio correcto
	return dataUpdate;
};

//NoSQL -> MONGO
export const updateDataNoSql = async (values : GuideInfo) =>{
	//
	//values = values as GuideInfo;
	console.log('********* Update GUIDE Service MongoDB **********');
	console.log('GET DATA FOR MongoDB :: ', values);
	console.log(values.information.languages);
	//Buscamos si exite ya la informacion 
	//Si existe, se actualiza
	console.log('*SEARCHING por este id->',values.id);
	const results = await getGuideInfoOne(values.id); 
	// Mostramos el dato obtenido
	console.log('Guide-info got ::',results);
	
	if(results){
		//Si el Guide-Info existe
		//Exist Data
		//Update data
		const resultsUpdate : boolean = await updateGuideInfo(values);
		if(!resultsUpdate){return false;}//ERROR ACTUALIZANDO DATOS
		//OK ALL
		//SI EXITE
		return true;
	}else{
		//Not exist Data
		//Creamos la informacion del guia
		const resultsGuide : boolean = await createGuideInfo(values);
		console.log('Service resultsGuide :: ',resultsGuide);
		//False 
		if (!resultsGuide) return false;
		return true;
	}
};