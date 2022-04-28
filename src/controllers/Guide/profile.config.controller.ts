//CONTROLADOR DE PROFILE/CONFIG
import { Request, Response } from 'express';

////////////////////////////////

// ->> Ruta GET

export const profileConfig_get = async (req:Request, res:Response) => { 
	return res.status(200).send('Profile Config');
};