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
	const rol : number = foundEmail.rol;
	// Exist
	//Se crea el token 
	try {
		//creamos el 'token'
		const createCode : string = await createTokenRecover();
		console.log('-> ',createCode);

		//!Almacenamos 'token - codigo' 
		const response : boolean|null = await saveTokenRecover(createCode, email, rol);
		console.log('Response Code: ',response);
		//Validamos la respuesta
		if (response === false){
			return undefined;
		}else if(response === null) {
			//Token ya exite
			return 'exists';
		}
		// ALL OK
		//True
		//TODO-> SE ENVIA CODE Y RUTA DE AUTENTIFICACION 
		return createCode;
	} catch (error) {
		//Algo salio mal
		console.log('Error al generar el Codigo: ', error);
		return false;
	}
};

//?Creamos el 'Token' 'Codigo'
const createTokenRecover = async () : Promise<string> => {
	const length = 6;
	const values ='1234567890abcdefg';
	const nanoid = customAlphabet(values, 10);
	return nanoid(length);
};