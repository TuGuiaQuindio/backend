import { getRepository } from 'typeorm';
import { Roles } from '../models/entity/Rol';

////////////////////////////////
//Guardamos el dato a roles 
export const createRoles = async (email : string , type : number) => {

    // creamos el rol
    const rol = {
        email : email,
        rol : type
    }
    //tratamos 
    try {
        // obtenemos la conexion y creamos el rol
        const newRol = getRepository(Roles).create(rol);
        // guardamos el nuevo rol
        const results = await getRepository(Roles).save(newRol);
        console.log("-> Resultados de Rol ::",results);
        return true;
        
    } catch (err) {
        console.log(err);
        return false;
    }
};