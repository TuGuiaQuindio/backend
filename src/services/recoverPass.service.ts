////////////////////////////////////////////////////////
//IPORTAMOS TRANSACCIONES
import { getRole } from '../model/entity/sql/transaction/find.g-c';
import { saveTokenRecover } from '../model/entity/nosql/transaction/redis/data';
////////////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { DataRecover } from '../interface/recoverPass';
////////////////////////////////////////////////////////
//IMPORTAMOS SERVICIOS
import { customAlphabet } from 'nanoid';
////////////////////////////////////////////////////////

export const recoverPass = async (values : DataRecover ) : Promise<boolean | string | null | undefined> => {
	// Validamos si el email existe
	const foundEmail = await getRole(values.email); 
	console.log(foundEmail);
	if(!foundEmail) return null;//User not exist
	//Obtenemos los datos
	const email :  string = foundEmail.email;
	// Exist
	//Se crea el token 
	try {
		//creamos el 'token'
		const tokenRecover : string = await createTokenRecover();
		console.log('-> ',tokenRecover);
		//!Almacenamos 'token - codigo' 
		const response : boolean|null = await saveTokenRecover(tokenRecover, email);
		console.log('Response token: ',response);
		//Validamos la respuesta
		if (response === false){
			return undefined;
		}else if(response === null) {
			//Token ya exite
			return 'exists';
		}
		// ALL OK
		//True
		//TODO-> SE ENVIA TOKEN Y RUTA DE AUTENTIFICACION 
		return tokenRecover;
	} catch (error) {
		//Algo salio mal
		console.log('Error al generar el token: ', error);
		return false;
	}
};

//?Creamos el 'Token' 'Codigo'
const createTokenRecover = async () : Promise<string> => {
	const length = 6;
	const nanoid = customAlphabet('1234567890abcdefg', 10);
	return nanoid(length);
};