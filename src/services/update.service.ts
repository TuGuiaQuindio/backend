// Actualizamos datos de tipo de usuario
////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { GuideSignup_extra } from '../interface/Guide/signup-guide.extra';
////////////////////////////////////////////////
//IMPORTAMOS ...

////////////////////////////////////////////////
export const updateData  = (values : GuideSignup_extra, type : 'mysql' | 'mongodb') => {
	//Actualizar datos
	//VALIDAMOS EL TIPO DE USUARIO
	if(type === 'mysql'){
		//Definimos el tipo de usuario 'GUIDE'
		values = values as GuideSignup_extra;
		console.log('GET DATA FOR MySQL:: ', values);
		
		// Validamos si el usuario guia exite

		//send data to update
		const dataUpdate = '' ;

		//Retornamos con la respuesta
		return dataUpdate;

	}else if(type === 'mongodb'){
		//
		values = values as GuideSignup_extra;
		console.log('GET DATA FOR MongoDB :: ', values);
		
	}
};