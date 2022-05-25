import { ResponseMessage } from '../interface/response-message';

//Codigos generados
export const responses: ResponseMessage[] = [
	//Sign-Up
	{ code: 'R200', msg: 'Usuario registrado correctamente'},
	{ code: 'R002', msg: 'No se puede registrar el usuario porque ya existe dentro de la base de datos' },
	//Log-in
	{ code: 'L200', msg: 'Inicio de sesion correcto' },
	{ code: 'L002', msg: 'Credenciales  invalidas' },
	//ERRORES
	{ code: 'E001', msg: 'Error interno del servidor' },
	{ code: 'E002', msg: 'Credemciales invalidas' },
	//Autenticacion
	{ code: 'A001', msg: 'Unauthorized : Es necesario autenticar' },
	{ code: 'A002', msg: 'Unauthorized : El cliente no posee los permisos suficientes' },
	//Upload File
	{ code: 'U001', msg: 'Archivo ya existe' },
	{ code: 'U002', msg: 'Información no existe' },
	{ code: 'U003', msg: 'Error en guardar datos en DB' },
	{ code: 'U004', msg: 'Info-Archivo guardada exitosamente' },
	//Change Password
	{ code: 'P001', msg: 'Datos no coinciden : (newPass , confirmPass) ' },
	{ code: 'P002', msg: 'Contraseña actual no coincide : (currentPassword)' },
	{ code: 'P003', msg: 'Error en actualización' },
	{ code: 'P004', msg : 'Contraseña actualizada con exito' },
	//Recover password of code
	{ code: 'RP01', msg: 'Error al guardar code-token' },
	{ code: 'RP02', msg: 'Ocurrio un error(createToken), intente de nuevo' },
	{ code: 'RP03', msg: 'Credenciales Incorrectas' },
	{ code: 'RP04', msg: 'Ocurrio un error en el controlador' },
	{ code: 'RP05', msg: 'TOKEN-CODE GENERADO' },
	{ code: 'RP06', msg: 'Token ya Generado' },
	//
	{ code: '', msg: '' },
	{ code: '', msg: '' },
	{ code: '', msg: '' },
	{ code: '', msg: '' },
	
];

export function getResponse(code: string): ResponseMessage | undefined {
	return responses.find(el => el.code === code);
}
