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
	//Profile
	{ code: 'P001', msg: 'Los datos no fueron encontrados' },
	{ code: 'P002', msg: 'Ocurrio un error actualizando datos' },
	{ code: 'P003', msg: 'Datos actualizados' },
	{ code: 'P004', msg: 'Datos no encontrados' },
	{ code: 'P005', msg: 'Usuario no encontrado' },
	//Profile visibility
	{ code: 'PV01', msg: 'Perfil visible!'},
	{ code: 'PV02', msg: 'Datos no encontrados' },
	{ code: 'PV03', msg: 'ERROR: actualizando datos!' },
	//Show Profile
	{ code: 'SP01', msg: 'perfiles cargados con exito!' },
	{ code: 'SP02', msg: 'Error al obtener los datos' },
	{ code: 'SP03', msg: 'No hay perfiles disponibles' },
	{ code: '', msg: '' },
	//Upload File
	{ code: 'U001', msg: 'Archivo ya existe' },
	{ code: 'U002', msg: 'Información no existe' },
	{ code: 'U003', msg: 'Error en guardar datos en DB' },
	{ code: 'U004', msg: 'Info-Archivo guardada exitosamente' },
	//Change Password
	{ code: 'CP01', msg: 'Datos no coinciden : (newPass , confirmPass) ' },
	{ code: 'CP02', msg: 'Contraseña actual no coincide : (currentPassword)' },
	{ code: 'CP03', msg: 'Error en actualización' },
	{ code: 'CP04', msg : 'Contraseña actualizada con exito' },
	{ code: 'CP05', msg: 'Usuario no encontrado' },
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
	{ code: 'SV01', msg: 'No hay vacantes' },
	{ code: 'SV02', msg: 'Error al obtener las vacantes' },
	//Update vacancy
	{ code: 'UV01', msg: 'Vacante no encontrada' },
	{ code: 'UV02', msg: 'Error al actualizar la vacante' },
	{ code: 'UV03', msg: 'Vacante actualiza' },
	//Delete vacancy
	{ code: 'DV01', msg: 'Vacante eliminada' },
	{ code: 'DV02', msg: 'No se pudo eliminar la vacante' },
	{ code: 'DV03', msg: 'No tiene los permisos: Id de la empresa no coincide!' },
	{ code: 'DV04', msg: 'Error eliminando vacante' },
	{ code: '', msg: '' },
	{ code: '', msg: '' },
	
];

export function getResponse(code: string): ResponseMessage | undefined {
	return responses.find(el => el.code === code);
}
