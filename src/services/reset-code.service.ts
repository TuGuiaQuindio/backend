// Servicio para validar codigo 
// Resetear contraseña
/////////////////////////////////////////////////////////
//IMPORTAMOS TRANSACCIONES
import { validatedCode } from '../model/entity/nosql/transaction/redis/data';
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
//Validamos el codigo
export const validateCode = async (  code : string ) => {
	try {
		const result : boolean|null|undefined = await validatedCode(code);
		console.log('Resultado servicio: ',result);
		return result;
	} catch (error) {
		console.log('ERROR en transacciones: ',error);
		return false;
	}
};


//Validamos contraseñas
export const validatedPass = async (newPass : string, confirmPass : string) => {
	if(newPass === confirmPass)return true;
	return false;
};