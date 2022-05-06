import { ResponseMessage } from '../interface/response-message';

export const responses: ResponseMessage[] = [
	{ code: 'R001', msg: 'Usuario registrado correctamente'},
	{ code: 'R002', msg: 'No se puede registrar el usuario porque ya existe dentro de la base de datos' },
	{ code: 'L001', msg: 'Inicio de sesion correcto' },
	{ code: 'L002', msg: 'Credenciales  invalidas' },
];

export function getResponse(code: string): ResponseMessage | undefined {
	return responses.find(el => el.code === code);
}
