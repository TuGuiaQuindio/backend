// CONTROLADOR PARA HOME

import { Request, Response } from 'express';

////////////////////////////////////////////////////////////////
//IMPORTACIONES DE SERVICIOS

////////////////////////////////////////////////////////////////

// ->>RUTA GET
export const homeGet = async(req: Request, res: Response) => {

	res.send('Welcome, Hello from /home');
};
