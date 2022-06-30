////////////////////////////////////////////////////////
//IMPORTAMOS SERVICIOS
import { customAlphabet } from 'nanoid';
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

//?Creamos el 'Codigo'
export const createCodeRecovery = async () : Promise<string> => {
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

export const generatePublicId = async (firstName:string, lastName:string):Promise<string> => {
	//obtenemos primer nombre y primer apellido
	const name = `${firstName.split(' ')[0]}.${lastName.split(' ')[0]}.`;
	//gneramos numero de id publico
	const numbers:number = await generateRandomNumber(99,1000);
	//Creamos el id publico
	const publicId:string = name+numbers.toString();
	console.log('publicId:: ',publicId);
	return publicId;
};

//GENERADOR DE CARACTERES
const generateRandomString = async (num : number) : Promise<string> => {
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

