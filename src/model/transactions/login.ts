// Controlador para el logueo de 'USUARIOS'
import { getRepository } from 'typeorm';
import { Guide } from '../entity/Guide';
import { Company } from '../entity/Company';
import { Roles } from '../entity/Rol';

// !! Controlador para obtener un usuarios por medio del email

export const getRole = async (email : string) : Promise<Roles | undefined> => {
	// Buscamos y obtenemos el usuario
	return getRepository(Roles).findOne({ email });
};

export const getGuide = async (email: string) : Promise<Guide | undefined> =>{
	// buscamos el guia 
	return getRepository(Guide).findOne({ rol: {email} });
};

export const getCompany = async (email: string): Promise<Company | undefined> =>{
	// Buscamos la Compañia-Empresa
	return getRepository(Company).findOne({rol: {email} });
};