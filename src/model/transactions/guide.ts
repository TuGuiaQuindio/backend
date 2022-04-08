////////////////////////////////////////////////
// Importamos
import { getRepository } from 'typeorm';
import { GuideSignup } from '../../interface/signup-guide';
//Entidad
import { Guide } from '../entity/Guide';

import { createRoles } from './roles';

// Controlador
// Crear usuario -> Registrar nuevo Guia 
export const createGuide = async (values: GuideSignup, password:string) => {
	
	// Obtenemos el usuario a buscar
	const userFound : boolean = await validatedGuide(values.NoDocument);
	
	// Validamos si el guia existe
	console.log('DESPUES DEL VALIDAOR');
	if(userFound) return undefined;

	// Obtengo los datos del cliente por parametro
	// Creamos objeto con datos
	const guide: GuideSignup = {
		NoDocument : values.NoDocument,
		firstName : values.firstName,
		lastName : values.lastName,
		age: values.age,
		city : values.city,
		phoneNumber : values.phoneNumber,
		rol: values.rol,
		// pass haseado
		password : password,
	};
	console.log(values, 'Values');
	// console.log("Email de controller :22: ",guide.emailEmail);
	////////////////////////////////////////////////
	// Guardamos el email en ROLES
	const {email, rol} = guide.rol;
	const resultsRoles = await createRoles(email, rol);
	//se valida que el rol se haya registrado correctamente
	if (!resultsRoles) return undefined;
	///////////////////////////////////////////////

	// Por el contrario, si el usuario fue encontrado
	// Creamos el usuario
	const newGuide = getRepository(Guide).create(guide);
	// Guardamos el usuario creado
	const results = await getRepository(Guide).save(newGuide);
	console.log('results :: ', results);
	// Retornamos los resutados
	return results;
};

// VALIDAMOS EL guia
const validatedGuide =  async ( NoDocument : string ) => {

	// Busca el guia por el documento 
	console.log('HOLAA!!');
	const guideFound = await getRepository(Guide).findOne({NoDocument});
	console.log('X- Usuario registrado -X ', guideFound);
	// Retornamos y nos devuelve un booleano
	return guideFound !== undefined;
};