////////////////////////////////////////////////

import { getRepository } from 'typeorm';
import { CompanySignup } from '../../interface/signup-company'
import { Company } from '../entity/Company';
import { createRoles } from './roles';

////////////////////////////////////////////////

// Controlador
// Crea usuarios de tipo Compañia
export const createCompany = async (values: CompanySignup, password : string) => {

    // Deconstruimos los datos 
    const company = {
        nameCompany : values.nameCompany,
        nit : values.nit,
        phoneNumber : values.phoneNumber,
        direction : values.direction,
        mainActivity : values.mainActivity,
        rol : values.rol,
        // pass haseado
        password : password
    }

    // Obtenemos el usuario a buscar
    let userFound : boolean = await validatedCompany(company.nit);
    // Validamos si el guia existe
    if(userFound) return undefined;
    

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
    const newCompany = getRepository(Company).create(company);
    // Guardamos el usuario creado
    const results = await getRepository(Company).save(newCompany);
    console.log("results :: ", results);
    // Retornamos los resutados
    return results;
}

const validatedCompany =  async ( nit : string ) => {
    // Busca el guia por el documento 
    const guideFound = await getRepository(Company).findOne({nit});
    console.log("X- Usuario registrado -X ", guideFound);
    // Retornamos y nos devuekve un booleano
    return guideFound !== undefined;
};