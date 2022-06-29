// En este archivo se registraran los datos del usuario al DB 
//IMPORTAMOS INTERFACES
import { GuideSignup } from '../interface/Guide/signup-guide';
import { CompanySignup } from '../interface/Company/data';
//IMPORTAMOS TRANSACIONES
import { createGuide } from '../model/entity/sql/transaction/guide';
import { createCompany } from '../model/entity/sql/transaction/company';
//IMPORTAMOS SERVICIOS
import bcrypt from './bcrypt.service';
import { generatePublicId } from './generateCode.service';

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
		//Creamos el -> publicId
		const publicId:string = await getPublicId(values.firstName, values.lastName);
		// Esperamos a que encripten la contraseña
		const password : string = await bcryptHash(values.password);
		// console.log("FROM signUp - SERVICE");
		console.log('Email signUp-service:: ', values.rol.email);
		// Obtenemos los datos y lo pasamos al ORM
		const guideResuls = await createGuide(values,publicId,password);
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
//Generamos el publicId
const getPublicId = async (firstName:string, lastName:string):Promise<string> => {
	return await generatePublicId(firstName, lastName);
};


export default signup;