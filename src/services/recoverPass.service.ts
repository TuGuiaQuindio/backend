////////////////////////////////////////////////////////
//IPORTAMOS TRANSACCIONES
import { getRole } from '../model/entity/sql/transaction/find.g-c';
import { saveCode } from '../model/entity/nosql/transaction/redis/data';
////////////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { DataRecover } from '../interface/dataRedis';
////////////////////////////////////////////////////////
//IMPORTAMOS SERVICIOS
import { customAlphabet } from 'nanoid';
////////////////////////////////////////////////////////

export const recoverPass = async (values : DataRecover ) : Promise<boolean | string | null | undefined> => {
	// Validamos si el email existe
	const foundRol = await getRole(values.email); 
	console.log(foundRol);
	if(!foundRol) return null;//User not exist
	//Obtenemos los datos
	const email :  string = foundRol.email;
	const rol : number = foundRol.rol;
	// Exist
	//Se crea el token 
	try {
		//creamos el 'token'
		const createCode : string = await createCodeRecovery();
		console.log('-> ',createCode);

		//!Almacenamos 'codigo' 
		const response : boolean|null = await saveCode(createCode, email, rol);
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

//?Creamos el 'Codigo'
const createCodeRecovery = async () : Promise<string> => {
	//Cantidad del codigo
	const length = 6;
	//Valores generados
	const characters : string = await generateRandomString(30);
	const numbers : number = await generateRandomNumber(1, 99999999999);
	//Sumamos las respuestas generadas
	const value : string = characters + numbers;
	console.log('Values: ',value);
	const nanoid = customAlphabet(value, 10);
	return nanoid(length);
};

//GENERADOR DE CARACTERES
const  generateRandomString = async (num : number) : Promise<string> => {
	//Cantidad de caracteres
	const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	//Bandera
	let result1 = '';
	const charactersLength : number = characters.length;
	//Generamos
	for ( let i = 0; i < num; i++ ) {
		result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
		// result1 += characters.charAt(Math.random() * charactersLength);
	}
	return result1;
};
//GENERADOR DE NUMEROS
const generateRandomNumber = async (min : number, max : number) : Promise<number> => {
	const number : number = Math.floor(Math.random() * (max * min)) + min;
	return number;
};