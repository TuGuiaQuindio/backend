import { ResponseMessage } from '../interface/response-message';

//Codigos generados
export const responses: ResponseMessage[] = [
	/**
	 * TODO -> Que tal si en los codigos colocamos los codigos del http ->
	 * TODO -> EJE: E001 -> E500 | A002 -> A403
	 * TODO -> VER TODAS LAS POSIBILIDADES
	 */
	{ code: 'R001', msg: 'Usuario registrado correctamente'},
	{ code: 'R002', msg: 'No se puede registrar el usuario porque ya existe dentro de la base de datos' },
	{ code: 'L001', msg: 'Inicio de sesion correcto' },
	{ code: 'L002', msg: 'Credenciales  invalidas' },
	{ code: 'E001', msg: 'Error interno del servidor' },
	{ code: 'A001', msg: 'Unauthorized : Es necesario autenticar' },
	{ code: 'A002', msg: 'Unauthorized : El cliente no posee los permisos suficientes' }
];

export function getResponse(code: string): ResponseMessage | undefined {
	return responses.find(el => el.code === code);
}
