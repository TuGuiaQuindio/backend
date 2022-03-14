// Controlador para el logueo de 'USUARIOS'
// TODO -> Terminar el login 
import { getRepository } from 'typeorm';
import { Guide } from '../models/entity/Guide';
import { Company } from '../models/entity/Company';
// Controlador para obtener un guia por medio del email
export const getUser = async (email : string) => {

    // Buscamos y obtenemos el usuario
    const guide = await getRepository(Guide).findOne({ rol: { email } });

    return guide;
};