
////////////////////////////////////////////////

// Importamos
import { getRepository } from "typeorm";
import { GuideSignup } from "../interface/signup-guide";
import { Guide } from '../models/entity/Guide'

////////////////////////////////////////////////
// *** CONTROLADORES LOGIN

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
        document : values.document,
        firstName : values.firstName,
        lastName : values.lastName,
        cc : values.cc,
        city : values.city,
        phoneNumber : values.phoneNumber,
        email : values.email, 
        password : password,
    }

    // TODO -> Validar si el usuario a registrar ya se encuentra en DB
    // Obtenemos el usuario a buscar
    let userFound : boolean = await validatedGuide(guide.document);
    
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

const validatedGuide =  async ( document : string ) => {

    // Busca el guia por el documento 
    const guideFound = await getRepository(Guide).findOne({document});
    console.log("XX ", guideFound);
    // validamos 
    return guideFound !== undefined;
};