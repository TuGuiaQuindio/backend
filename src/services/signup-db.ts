
// En este archivo se registraran los datos del usuario al DB 

import { GuideSignup } from "../interface/signup-guide";
import { CompanySignup } from "../interface/signup-company";
import guide  from "../mock/data";
import company from "../mock/data";

import bcrypt from "../services/bcrypt"

// Decostruimos
const { bcryptHash } = bcrypt;
// TODO -> Terminar esta funcion de registrar los datos a 'mock'
async function signup(values: GuideSignup | CompanySignup,  type: "guide" | "company") {
    // Validamos el tipo 
    // Tipo guia
    if(type == "guide"){
        // Esperamos a que encripten la contraseña
        const password = await bcryptHash(values.password);

        // Obtenemos los datos
        // guide.guide.firstName  values.firstName


    }
    // Tipo compañia ó empresa
    else if(type == "company"){
        // Esperamos a que encripten la contraseña
        const password = await bcryptHash(values.password);
        
        //obtemos los datos
    }

    
};

export default signup;