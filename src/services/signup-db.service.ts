
// En este archivo se registraran los datos del usuario al DB 

import { GuideSignup } from "../interface/signup-guide";
import { CompanySignup } from "../interface/signup-company";

import { createGuide } from '../controllers/guide.controller'
import { createCompany } from '../controllers/company.controller';
import bcrypt from "./bcrypt.service"

// Decostruimos
const { bcryptHash } = bcrypt;

async function signup(values: GuideSignup | CompanySignup,  type: "guide" | "company") {
    // Validamos el tipo 
    // Tipo guia
    if(type == "guide"){
        // Definimos el tipo de Usuario 'GUIDE'
        values = values as GuideSignup;
        // Esperamos a que encripten la contraseña
        const password = await bcryptHash(values.password);
        console.log("FROM signUp - SERVICE");

        console.log("Email service:: ", values.rol.email);
        
        // Obtenemos los datos y lo pasamos al ORM
        const guideResuls = createGuide(values, password);
        // Resornamos los datos devueltos
        return guideResuls;
    }
    
    // Tipo compañia ó empresa
    else if(type == "company"){
        // Definimos el tipo de Usuario 'COMPANY'
        values = values as CompanySignup;
        // Esperamos a que encripten la contraseña
        const password = await bcryptHash(values.password);
        
        //obtemos los datos, lo pasamos al ORM
        const companyResults = createCompany(values, password);
        // Resornamos el valor devueltos
        return companyResults;
    }
};

export default signup;