// Controlador para el logueo de 'USUARIOS'
import { MySQLDataSource as dsource } from '../../../../config/datasources';
import { Guide } from '../Guide';
import { Company } from '../Company';
import { Roles } from '../Rol';

//! //////////////////////////////////////////////////////
// * --> Rol <--
// !! Controlador para obtener un usuarios por medio del -> EMAIL <-
export const getRole = async (email : string) : Promise<Roles | null> => {
	// Buscamos y obtenemos el usuario
	return dsource.getRepository(Roles).findOne({ where : { email } });
};

//! //////////////////////////////////////////////////////
//! //////////////////////////////////////////////////////
// * --> GUIDE <--
// !! Encontrar guias por medio del -> ID <-

export const getGuideId = async ( id ?: number ) : Promise<Guide | null> => { 
	//Buscamos el guia por el Id
	return dsource.getRepository(Guide).findOne({ where : { id } });
};

// !! Encontrar guias por medio de -> NoDocument <-
export const validatedGuide =  async ( NoDocument : string ) : Promise< boolean > => {
	// Busca el guia por el documento 
	console.log('Entry validateGuide - transaction/find-guide');
	const guideFound = await dsource.getRepository(Guide).findOne({ where : { NoDocument }});
	console.log('X- Usuario registrado -X :', guideFound);
	// Retornamos y nos devuelve un booleano
	return guideFound != undefined;
};

// !! Econtrar Guia por medio de -> Email <-
export const getGuide = async (email: string) : Promise<Guide | null> =>{
	// buscamos el guia 
	return dsource.getRepository(Guide).findOne({ where : { rol: {email} } });
};

//! /////////////////////////////////////////////////////
//! /////////////////////////////////////////////////////
// * --> COMPANY <--
// ! Econtrar Empresa por medio de -> ID <-
export const getCompanyId = async (id : number) : Promise<Company | null> => {
	return dsource.getRepository(Company).findOne({ where : { id }});
};

// !! Econtrar Empresa por medio de -> Email <-
export const getCompany = async (email: string): Promise<Company | null> =>{
	// Buscamos la Compañia-Empresa
	return dsource.getRepository(Company).findOne({ where : { rol: {email} } });
};