

// Exportamos 

import { getRepository } from "typeorm";
import { GuideSignup } from "../interface/signup-guide";
import { Guide } from '../models/entity/Guide'
// Controlador para obtener lso guias
export const getUsers = async () => {

};

// Controlador
// Crear usuario -> Registrar nuevo Guia 
export const createGuide = async (values: GuideSignup, password:string) => {
    // Obtengo los datos del cliente por parametro

    // Creamos objeto con datos
    const guide = {
        firstName : values.firstName,
        lastName : values.lastName,
        cc : values.cc,
        city : values.city,
        phoneNumber : values.phoneNumber,
        email : values.email, 
        password : password,
    }

    // TODO -> Validar si el usuario a registrar ya se encuentra en DB
    // // Obtenemos el usuario 
    // const userFound = [getRepository(Guide).find()] 
    // // Validamos si el guia existe
    // userFound.forEach(element => {
        
    //     if (guide.email == element.email ){

    //     }
    // });


    // Creamos el usuario
    const newGuide = getRepository(Guide).create(guide);
    // Guardamos el usuario creado
    const results = await getRepository(Guide).save(newGuide);

    // Retornamos los resutados
    return results;
}