
// En este archivo se registraran los datos del usuario al DB 

import { GuideSignup } from '../interface/signup-guide';
import { CompanySignup } from '../interface/signup-company';

import { createGuide } from '../model/transactions/guide';
import { createCompany } from '../model/transactions/company';
import bcrypt from './bcrypt.service';

// Decostruimos
const { bcryptHash } = bcrypt;
// values: Partial<GuideSignup | CompanySignup>
//TYPE 1 -> Guide
//TYPE 2 -> Company
async function signup (values: Exclude<GuideSignup, {age:number,city:string, phoneNumber:string}> | Exclude<CompanySignup, {phoneNumber:string, mainActivity:string}>,  type: 'guide' | 'company') {
	// Validamos el tipo 
	// Tipo guia
	if(type == 'guide'){
		// Definimos el tipo de Usuario 'GUIDE'
		values = values as GuideSignup;
		// Esperamos a que encripten la contraseña
		const password : string = await bcryptHash(values.password);
		// console.log("FROM signUp - SERVICE");

		console.log('Email signUp-service:: ', values.rol.email);
		
		// Obtenemos los datos y lo pasamos al ORM
		const guideResuls = await createGuide(values, password);
		// Resornamos los datos devueltos
		
		return guideResuls;
	}
	
	// Tipo compañia ó empresa
	else if(type == 'company'){
		// Definimos el tipo de Usuario 'COMPANY'
		values = values as CompanySignup;
		// Esperamos a que encripten la contraseña
		const password : string = await bcryptHash(values.password);
		
		//obtemos los datos, lo pasamos al ORM
		const companyResults = await createCompany(values, password);
		// Resornamos el valor devueltos
		return companyResults;
	}
}

export default signup;