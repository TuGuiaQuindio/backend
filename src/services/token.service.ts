///////////////////////////////////////////////////////////
//IMPORTACIONES DE INTERFACES
import { Payload } from '../interface/payload-token';
///////////////////////////////////////////////////////////
import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { join } from 'path';




////////////////////////////////////////////////////////////
// Generamos y validamos los tokens
export const createToken = async ( email:string, rol: number, id?: number, options?: Partial<jwt.SignOptions> ) : Promise<string> => {
	//leemos llave
	const key : Buffer = await readKey();
	const defaultOptions: jwt.SignOptions = { algorithm: 'RS256', expiresIn: 60 * 60 };
	const signOptions: jwt.SignOptions = { ...defaultOptions, ...options};
	return jwt.sign( { id, email, rol },key , signOptions);
};


// Verificamos el token obtenido 
export const verifyToken = async ( token : string ) : Promise<string | undefined | jwt.JwtPayload> => {
	// leemos la llave
	const cert : Buffer = await readKey();
	// Tratamos 
	try {
		//Decodificamos el token
		/**
		 * @param token a decodificar
		 * @param cert Llave para el token
		 */
		const decoded : string | jwt.JwtPayload = await decodeToken( token, cert );
		return decoded;
	} catch(err) {
		// err
		console.log('Token ERROR:', err);
		return undefined;    
	}
};
//Leer la llave
export const readKey = async () => {
	return readFileSync( join(process.cwd(), '.secret', 'sign.key') );
};

// Decode token 
export const decodeToken = async ( token: string, key : Buffer ) =>{
	return jwt.verify(token, key, { algorithms: ['RS256'] });
};
//Separar token obtenido 
export const pullApartToken = async ( data : string ) : Promise<string> => { 
	return data.split(' ')[1];
};

//////////////////////////////////////////////////
//OBTENER DATOS DEL TOKEN
//OBTENER SOLO EL ID DEL PAYLOAD
//Obtenemos el ID que nos da el token en el payload
export async function getId( authorization ?: string) : Promise<number> {
	//Validamos el token
	if (!authorization) return 0;
	//Obtenemos el token
	const token : string = await pullApartToken( authorization );
	//Decode token
	const decodeToken = await verifyToken(token) as Payload;
	//Data token
	//Decosntruccion, {id}
	const { id } = decodeToken;
	return id;
}

export async function getRole( authorization ?: string) : Promise<number> {
	//Validamos el token
	if (!authorization) return 0;
	//Obtenemos el token
	const token : string = await pullApartToken( authorization );
	//Decode token
	const decodeToken = await verifyToken(token) as Payload;
	//Data token
	//Decosntruccion, {id}
	const { rol } = decodeToken;
	return rol;
}