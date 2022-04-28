////////////////////////////////////////////////

import { MySQLDataSource as dsource } from '../../config/datasources';
import { CompanySignup } from '../../interface/signup-company';
import { Company } from '../entity/Company';
import { createRoles } from './roles';

////////////////////////////////////////////////

// Controlador
// Crea usuarios de tipo Compañia
export const createCompany = async (values: CompanySignup, password : string) : Promise<Company | undefined> => {

	// Deconstruimos los datos 
	const company = {
		nameCompany : values.nameCompany,
		nit : values.nit,
		direction : values.direction,
		rol : values.rol,
		// pass haseado
		password : password
	};

	// Obtenemos el usuario a buscar
	const userFound : boolean = await validatedCompany(company.nit);
	// Validamos si el guia existe
	if(userFound) return undefined;
	

	//////////////////////////////////////////////
	//Guardamos el email en ROLES
	//Obtenemos rol y lo deconstruimos
	const { email , rol} = company.rol;
	const resultsRoles = await createRoles(email, rol);
	// Se valida que el rol se haya guardado en DB
	if (!resultsRoles) return undefined;
	//////////////////////////////////////////////
	// Por el contrario, si el usuario fue encontrado
	// Creamos el usuario
	const newCompany = dsource.getRepository(Company).create(company);
	// Guardamos el usuario creado
	const results = await dsource.getRepository(Company).save(newCompany);
	console.log('results :: ', results);
	// Retornamos los resutados
	return results;
};
// VALIDAR COMPAÑIA SI EXISTE
const validatedCompany =  async ( nit : string ) : Promise< boolean > => {
	// Busca el guia por el documento 
	const guideFound = await dsource.getRepository(Company).findOne({ where : { nit } });
	console.log('X- Usuario registrado -X ', guideFound);
	// Retornamos y nos devuekve un booleano
	return guideFound != undefined;
};