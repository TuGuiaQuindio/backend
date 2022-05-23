////////////////////////////////////////////////////////
//IPORTAMOS TRANSACCIONES
import { getRole } from '../model/entity/sql/transaction/find.g-c';
////////////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { DataRecover } from '../interface/recoverPass';
////////////////////////////////////////////////////////
//IMPORTAMOS SERVICIOS
import { customRandom, urlAlphabet, customAlphabet } from 'nanoid';
////////////////////////////////////////////////////////

export const recoverPass = async (values : DataRecover ) : Promise<boolean | string | null | undefined> => {
	// Validamos si el email existe
	const foundEmail = await getRole(values.email); 
	console.log(foundEmail);
	if(!foundEmail) return null;//User not exist
	//Obtenemos los datos
	const email :  string = foundEmail.email;
	const rol : number = foundEmail.rol;
	// Exist
	//Se crea el token 
	try {
		//creamos el 'token'
		const token : string = await createTokenRecover();
		console.log('-> ',token);
		
		
		return token;
	} catch (error) {
		//Algo salio mal
		console.log('Error al generar el token: ', error);
		return false;
	}
};

const createTokenRecover = async () : Promise<string> => {
	//
	const nanoid = customAlphabet('1234567890abcdefg', 10);
	return nanoid(6);
};