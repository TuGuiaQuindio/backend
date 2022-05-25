// TRANSACCIONES DE DATOS EN REDIS
//////////////////////////////////////////////
// IMPORTAMOS CLIENTE REDIS
import { redisClient } from '../../../../../config/connection/Redis/conection';
//////////////////////////////////////////////

//////////////////////////////////////////////

export const saveTokenRecover = async (token : string, email : string) : Promise<boolean | null> => {
	//Obtenemos el tado
	const getStore : string | null = await redisClient.get(email);
	console.log('Dato obtenido redis: ', getStore);
	//Validamos si el token ta existe
	if(getStore){return null;}//Ya existe el token 
	console.log('despues de get reids');

	//No existe el token - codigo
	console.log('SAVING CODE IN REDIS...');
	try {
		const assign : string | null = await redisClient.set(email,token);
		console.log('Code recover: ',assign);
	} catch (error) {
		console.log('Error a asingar el codigo-> ',error);
		return false;
	}
	// Damos expiracion al dato
	const resultsExpire = await exprireData(email); 
	if(!resultsExpire) return false;//Algo salio mal
	//All ok
	return true;
	
};
// Expiracion de dato
const exprireData = async (email : string) : Promise<boolean> => {
	// Tiempo de expiracion
	// * 1m -> 60s
	// *** (segundos * minutos)
	const segundos = 60 * 10; 
	try {
		const expireData = await redisClient.expire(email,segundos);
		console.log('Exprire Data: ',expireData);
	} catch (error) {
		console.log('ERROR en asignar expiracion a codigo>> ', error);
		return false;
	}
	//ALL OK
	return true;
};
