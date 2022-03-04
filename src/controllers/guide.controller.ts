
////////////////////////////////////////////////

// Importamos
import { getRepository } from "typeorm";
import { GuideSignup } from "../interface/signup-guide";
import { Guide } from '../models/entity/Guide'

////////////////////////////////////////////////
// *** CONTROLADORES LOGIN guia

// Controlador para obtener un guia por medio del email
export const getGuide = async (email : string) => {

    // Buscamos y obtenemos el usuario
    const guide = await getRepository(Guide).findOne({ email });

    return guide;
};

// ****************************************************

// Controlador
// Crear usuario -> Registrar nuevo Guia 
export const createGuide = async (values: GuideSignup, password:string) => {
    // Obtengo los datos del cliente por parametro

    // Creamos objeto con datos
    const guide = {
        NoDocument : values.NoDocument,
        firstName : values.firstName,
        lastName : values.lastName,
        city : values.city,
        phoneNumber : values.phoneNumber,
        email : values.email, 
        password : password,
    }

    // Obtenemos el usuario a buscar
    let userFound : boolean = await validatedGuide(guide.NoDocument);
    
    // Validamos si el guia existe
    if(userFound) return undefined;
    
    // Por el contrario, si el usuario fue encontrado
    // Creamos el usuario
    const newGuide = getRepository(Guide).create(guide);
    // Guardamos el usuario creado
    const results = await getRepository(Guide).save(newGuide);
    console.log("results :: ", results);
    // Retornamos los resutados
    return results;
}

const validatedGuide =  async ( NoDocument : string ) => {

    // Busca el guia por el documento 
    const guideFound = await getRepository(Guide).findOne({NoDocument});
    console.log("X- Usuario registrado -X ", guideFound);
    // Retornamos y nos devuekve un booleano
    return guideFound !== undefined;
};