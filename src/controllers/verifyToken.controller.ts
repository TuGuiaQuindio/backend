import { Request, Response } from 'express';

/////////////////////////////////////////////////////////////
//IMPORTAMOS JWT
import { JwtPayload } from 'jsonwebtoken';
/////////////////////////////////////////////////////////////
//IMPORTAMOS SERVICIOS
import { getResponse } from '../services/response-message.service';
import { pullApartToken, verifyToken } from '../services/token.service';
/////////////////////////////////////////////////////////////
//IMPORTAMOS INTERFACES 
import { Payload } from '../interface/payload-token';
/////////////////////////////////////////////////////////////

export const verifyTokenDecode = async ( req:Request, res:Response ) => {
	//Obtenemos cabeceras
	const { authorization } = req.headers;
	//Verificamos si exste
	if(!authorization) return res.status(401).json(getResponse('A001'));
	//Si existe
	//Verificamos token 
	const response : Payload = await decodeToken(authorization);
	//Validamos
	if(!response) return res.status(401).json(getResponse('A003'));
	//ALL OK
	return res.status(200).json(response);
};

//Validamos el token y decodificamos
const decodeToken = async (token : string) : Promise<Payload> => {
	const getToken : string = await pullApartToken(token);
	//Verificamos el token
	const result : string|undefined|JwtPayload = await verifyToken(getToken);
	return result as Payload;
};