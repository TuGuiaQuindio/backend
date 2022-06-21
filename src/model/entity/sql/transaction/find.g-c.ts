// Controlador para el logueo de 'USUARIOS'
import { MySQLDataSource as dsource } from '../../../../config/connection/Mysql/datasources';
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
// !! Obtener todos los usuarios
export const getGuides = async () => {
	return await dsource.getRepository(Guide).find();
};
// !! Encontrar 'GUIDE' por medio del -> ID <-
export const getGuideId = async ( id : number ) : Promise<Guide | null> => { 
	//Buscamos el guia por el Id
	return await dsource.getRepository(Guide).findOne({ where : { id } });
};
// !! Encontrar 'GUIDE' por medio de -> NoDocument <-
export const getGuideDoc =  async ( NoDocument : string ) : Promise< boolean > => {
	// Busca el guia por el documento 
	console.log('Entry validateGuide - transaction/find-guide');
	const guideFound = await dsource.getRepository(Guide).findOne({ where : { NoDocument }});
	console.log('X- Usuario registrado -X :', guideFound);
	// Retornamos y nos devuelve un booleano
	return guideFound != undefined;
};
// !! Econtrar 'GUIDE' por medio de -> Email <-
export const getGuideEmail = async (email: string) : Promise<Guide | null> =>{
	// buscamos el guia 
	return dsource.getRepository(Guide).findOne({ where : { rol: {email} } });
};


//! /////////////////////////////////////////////////////
//! /////////////////////////////////////////////////////
// * --> COMPANY <--
// ! Econtrar 'COMPANY' por medio de -> ID <-
export const getCompanyId = async (id : number) : Promise<Company | null> => {
	return dsource.getRepository(Company).findOne({ where : { id }});
};
// !! Econtrar 'COMPANY' por medio de -> Email <-
export const getCompanyEmail = async (email: string): Promise<Company | null> =>{
	// Buscamos la Compañia-Empresa
	return dsource.getRepository(Company).findOne({ where : { rol: {email} } });
};
// !! Encontrar 'COMPANY' por medio de -> Nit <-
export const getCompanyNit =  async ( nit : string ) : Promise< boolean > => {
	// Busca el guia por el documento 
	const guideFound = await dsource.getRepository(Company).findOne({ where : { nit } });
	console.log('X- Usuario registrado -X ', guideFound);
	// Retornamos y nos devuekve un booleano
	return guideFound != undefined;
};