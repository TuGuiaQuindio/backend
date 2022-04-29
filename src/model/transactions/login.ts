// Controlador para el logueo de 'USUARIOS'
import { MySQLDataSource as dsource } from '../../config/datasources';
import { Guide } from '../entity/sql/Guide';
import { Company } from '../entity/sql/Company';
import { Roles } from '../entity/sql/Rol';

// !! Controlador para obtener un usuarios por medio del email

export const getRole = async (email : string) : Promise<Roles | null> => {
	// Buscamos y obtenemos el usuario
	return dsource.getRepository(Roles).findOne({ where : { email } });
};

export const getGuide = async (email: string) : Promise<Guide | null> =>{
	// buscamos el guia 
	return dsource.getRepository(Guide).findOne({ where : { rol: {email} } });
};

export const getCompany = async (email: string): Promise<Company | null> =>{
	// Buscamos la Compañia-Empresa
	return dsource.getRepository(Company).findOne({ where : { rol: {email} } });
};