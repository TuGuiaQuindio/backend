//IMPORTAMOS CONFIGURACIONES
import { MySQLDataSource as dsource } from '../../../../config/connection/Mysql/datasources';
////////////////////////////////////////////////
//IMPORTAMOS ENTIDADES
import { Company } from '../Company';
import { createRoles } from './roles';
import { getCompanyNit } from './find.g-c';
/////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { CompanySignup } from '../../../../interface/Company/data-sql';
import { DataSql } from '../../../../interface/Company/data-sql';
/////////////////////////////////////////////////

// Controlador
// Crea usuarios de tipo Compañia
export const createCompany = async (values: CompanySignup, password : string) : Promise<Company | undefined> => {

	// Obtenemos el usuario a buscar
	const userFound : boolean = await getCompanyNit(values.nit);
	// Validamos si el guia existe
	if(userFound) return undefined;
	
	// Obtengo los datos del cliente por parametro
	// Deconstruimos los datos 
	const company = {
		nameCompany : values.nameCompany,
		nit : values.nit,
		direction : values.direction,
		rol : values.rol,
		// pass haseado
		password : password
	};
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

//? ////////////////////////////////////////////////////////////
//? ////////////////////////////////////////////////////////////
// ? UPDATE DATA
export const updateCompany = async  ( id : number, values : DataSql ) : Promise<boolean> => {
	//Actualizamos los datos
	try {
		//Tratamos
		const resultsUpdate = await dsource.getRepository(Company).update( id, {
			nameCompany : values.nameCompany,
			direction : values.direction,
			phoneNumber : values.phoneNumber,
		});
		//Show Results
		console.log('FROM UPDATECOMPANY :: ', resultsUpdate);
	} catch (e) {
		//Error
		console.log('ERROR Update Company :: ',e);
		return false;
	}
	// -> TODO OK
	return true;
};
//Actualizar contraseña
export const updatePassword = async (id : number, pass : string) => {
	console.log('updatePass : ', pass);

	try {
		const result = await dsource.getRepository(Company).update(id, {
			password : pass
		});
		//Show result
		console.log('FROM updatePass-> ',result);
	} catch (err) {
		console.log('ERROR :: UPDATE Password ',err);
		return false;
	}
	//ALL OK
	return true;
};	