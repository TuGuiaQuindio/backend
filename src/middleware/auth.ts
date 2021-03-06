// conexion al token.validate con la rutas
import { Request, Response, NextFunction } from 'express';
////////////////////////////////////////////////////////////////////////////
// IMPORTAMOS SERVICIOS
import { verifyToken, pullApartToken } from '../services/token.service';
import { getResponse } from '../services/response-message.service';
////////////////////////////////////////////////////////////////////////////

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
	// Obtengo el token JWT 
	const { authorization } = req.headers;
	// Comprobación de undefined
	if (!authorization) return res.status(401).json(getResponse('A001'));
	//Separamos el token obtenido
	const token : string = await pullApartToken(authorization);
	console.log('Token Ingresado:: ', token);

	// Valido el token JWT
	const payload = await verifyToken(token);
	// devuleve el cuerpo del payload del token
	if (payload) {
		res.locals.payload = payload;
		next();
	} else {
		return res.status(401).json({ msg: 'Invalid signature' });
	}
};