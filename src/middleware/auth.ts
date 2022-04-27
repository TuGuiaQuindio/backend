// conexion al token.validate con la rutas
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/token.service';


export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
	// Obtengo el token JWT 
	const { authorization } = req.headers;
	// Comprobación de undefined
	if (!authorization) return res.status(401).json({ msg: 'Unauthorized' });
	const token = authorization.split(' ')[1];
	console.log('Token Ingresado:: ', token);

	// Valido el token JWT
	const payload = await verifyToken(token);
	if (payload) {
		res.locals.payload = payload;
		next();
	} else {
		return res.status(401).json({ msg: 'Invalid signature' });
	}
};