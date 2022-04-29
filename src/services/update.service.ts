// Actualizamos datos de tipo de usuario
////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { GuideSignup_extra } from '../interface/Guide/signup-guide.extra';
////////////////////////////////////////////////
//IMPORTAMOS ...

////////////////////////////////////////////////
export const updateData  = (values : GuideSignup_extra, type : 'guide' | 'company') => {
	//Actualizar datos
	//VALIDAMOS EL TIPO DE USUARIO
	if(type === 'guide'){
		//Definimos el tipo de usuario 'GUIDE'
		values = values as GuideSignup_extra;
		console.log('Datos obtenidos :: ', values);
		
		//send data to update
		const dataUpdate = '' ;

		//Retornamos con la respuesta
		return dataUpdate;

	}else if(type === 'company'){
		//
	}
};