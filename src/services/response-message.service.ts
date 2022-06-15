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
	{ code: 'A003', msg: 'Unauthorized : Token Expirado' },
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
	// Reset pass, Codigo
	{ code: 'C001', msg: 'Codigo invalido' },
	{ code: 'C002', msg: 'Codigo correcto' },
	{ code: 'C003', msg: 'Usuario no encontrado!' },
	{ code: 'C004', msg: 'Contraseña actualizada con exito!' },
	{ code: 'C005', msg: 'Las contraseñas no coinciden!' },
	//Create vacancy
	{ code: 'V001', msg: 'Vacante creada con exito!' },
	{ code: 'V002', msg: 'Ocurrio un error en el servidor!' },
	{ code: 'V003', msg: 'NO tiene permisos para crear mas vacantes' },
	{ code: 'V004', msg: 'INFORMACION de empresa no encontrada' },
	//Show vacancies
	{ code: 'SV01', msg: 'Vacantes no encontradas' },
	{ code: 'SV02', msg: 'Error al obtener las vacantes' },
	//Update vacancy
	{ code: 'UV01', msg: 'Vacante no encontrada' },
	{ code: 'UV02', msg: 'Error al actualizar la vacante' },
	{ code: 'UV03', msg: 'Vacante actualiza' },
	{ code: '', msg: '' },
	{ code: '', msg: '' },
	{ code: '', msg: '' },
	{ code: '', msg: '' },
	{ code: '', msg: '' },
	{ code: '', msg: '' },
	
];

export function getResponse(code: string): ResponseMessage | undefined {
	return responses.find(el => el.code === code);
}
