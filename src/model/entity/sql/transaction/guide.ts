////////////////////////////////////////////////
// Importamos
import { MySQLDataSource as dsource } from '../../../../config/datasources';
import { GuideSignup } from '../../../../interface/Guide/signup-guide';
//Entidad
import { Guide } from '../Guide';
//Trancision de datos tipo : Rol
import { createRoles } from './roles';
//////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { GuideSignup_extra } from '../../../../interface/Guide/signup-guide.extra';
//////////////////////////////////////////
//IMPORTAR FIND_GUIDE POR NoDocument
import { validatedGuide } from './find.g-c';

// ?CREATE -> Registrar nuevo Guia 
export const createGuide = async (values: GuideSignup, password:string) : Promise<Guide | undefined> => {
	
	// Obtenemos el usuario a buscar
	const userFound : boolean | undefined = await validatedGuide(values.NoDocument);
	console.log('Status User/Guide validado', userFound);
	
	// Validamos si el guia existe
	console.log('DESPUES DEL VALIDAOR En transaction');
	if(userFound) return undefined;

	// Obtengo los datos del cliente por parametro
	// Creamos objeto con datos
	const guide: GuideSignup = {
		NoDocument : values.NoDocument,
		firstName : values.firstName,
		lastName : values.lastName,
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
	const newGuide = dsource.getRepository(Guide).create(guide);
	// Guardamos el usuario creado
	const results = await dsource.getRepository(Guide).save(newGuide);
	console.log('results :: ', results);
	// Retornamos los resutados
	return results;
};

/** 
 * ? UPDATE DATA
 */
export const updateGuide = async ( id : number, guide : Guide, values : GuideSignup_extra) => {
	//Actualizamos los datos
	try{
		const results = await dsource.getRepository(Guide).update(id, {
			firstName : values.firstName,
			lastName : values.lastName,
			dataOfBirth : values.dataOfBirth,
			city : values.city,
			phoneNumber : values.phoneNumber,
		});
		//Mostrar respuesta
		console.log('FROM UPDATEGUIDE -> ', results);
	}catch(err){
		console.log('ERROR ::  updateGuide');
		console.log(err);
		//ERROR
		return false;
	}
	//->TODO OK
	return true;
};