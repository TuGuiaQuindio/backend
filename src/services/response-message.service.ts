import { ResponseMessage } from '../interface/response-message';

//Codigos generados
export const responses: ResponseMessage[] = [
	/**
	 * TODO -> Que tal si en los codigos colocamos los codigos del http ->
	 * TODO -> EJE: E001 -> E500 | A002 -> A403
	 * TODO -> VER TODAS LAS POSIBILIDADES
	 */
	//Sign-Up
	{ code: 'R200', msg: 'Usuario registrado correctamente'},
	{ code: 'R002', msg: 'No se puede registrar el usuario porque ya existe dentro de la base de datos' },
	//Log-in
	{ code: 'L200', msg: 'Inicio de sesion correcto' },
	{ code: 'L002', msg: 'Credenciales  invalidas' },
	//ERRORES
	{ code: 'E001', msg: 'Error interno del servidor' },
	{ code: 'E002', msg: 'Credemciales invalidas' },
	//
	{ code: 'A001', msg: 'Unauthorized : Es necesario autenticar' },
	{ code: 'A002', msg: 'Unauthorized : El cliente no posee los permisos suficientes' },
	//Upload File
	{ code: 'U001', msg: 'Archivo ya existe' },
	{ code: 'U002', msg: 'Información no existe' },
	{ code: 'U003', msg: 'Error en guardar datos en DB' },
	{ code: 'U004', msg: 'Info-Foto guardada exitosamente' },
	
];

export function getResponse(code: string): ResponseMessage | undefined {
	return responses.find(el => el.code === code);
}
