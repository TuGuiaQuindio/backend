// TRANSACCIONES DE DATOS EN REDIS
//////////////////////////////////////////////
// IMPORTAMOS CLIENTE REDIS
import { redisClient } from '../../../../../config/connection/Redis/conection';
//////////////////////////////////////////////
//IMPORTACIONES INTERFACES
import { ResetPass } from '../../../../../interface/dataRedis';
//////////////////////////////////////////////

//Guardar codigo generado saveCodeGenerated
export const saveCode = async (code : string, email : string, rol : number) : Promise<boolean | null> => {
	//Obtenemos el tado
	console.log('LOADING DATA...');
	console.log('SEARCHING DATA...');
	const getData : string | null = await redisClient.get(email);
	console.log('Dato obtenido redis: ', getData);
	//Validamos si el token ta existe
	if(getData){console.log('DATA FOUND, EXISTS!'); return null;}//Ya existe el token 
	
	console.log('DATA NOT FOUND!');
	//No existe el token - codigo
	console.log('SAVING CODE IN REDIS...');
	try {
		const assign : string | null = await redisClient.set(email, JSON.stringify({
			code,
			email,
			rol
		}));
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
	const segundos = (60 * 10); 
	try {
		const expireData : boolean = await redisClient.expire(email,segundos);
		console.log('Exprire Data: ',expireData, ' en ', segundos,'s');
	} catch (error) {
		console.log('ERROR en asignar expiracion a codigo>> ', error);
		return false;
	}
	//ALL OK
	return true;
};

//////////////////////////////////////////////////////
//?VALIDATED CODE
export const isValidatedCode = async (code : string) : Promise<null|undefined|object> =>{
	//TODO-> ESTO SE PUEDE HACER MEJOR, BUSCAR FORMA
	//TODO-> MIRAR UN MEJOR NOMBRE AL SCRIPT
	//Buscamos todos los que coincidan
	const response : string[] = await redisClient.keys('*@*');
	console.log('Datos de Redis: ',response);
	//Code bandera
	let codeRedis : string | null = null;
	//Email bandera
	let email : string | null = null;
	//rol bandera
	let rol : number | null = null;
	//Pasamos por cada dato obtenido
	for(const ele of response){
		//Buscamos el dato 
		const data = await redisClient.get(ele);
		//No hay datos
		if(!data) return undefined;
		//Parseamos el objeto
		const valuesData = JSON.parse(data);
		//Validamos si CODIGO coincide con el codigo ingresado
		if(valuesData.code == code) {
			//Codigo que coincide
			codeRedis = valuesData.code; 
			//Email del codigo
			email = ele;	
			// obtenemos el rol 		
			rol = valuesData.rol;
		}
	}
	//console.log('codeRedis: ',codeRedis,'\nemail: ',email,'\nrol: ',rol);
	if(codeRedis == null && email == null && rol == null) return null;//Codigo No valido
	//Datos de Redis
	const dataRedis : object = {
		code : codeRedis,
		email ,
		rol
	}as ResetPass;
	//Codigo valido
	return dataRedis;
};
