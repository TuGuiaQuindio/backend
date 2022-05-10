// import token from './token-services';

import { createToken }  from '../services/token.service';
import { getRole, getGuide, getCompany  } from '../model/entity/sql/transaction/find.g-c';

import bcrypt from '../services/bcrypt.service';
import { Roles } from '../constants/role.constants';

//Deconstruccion 
const { verify } = bcrypt;
	
export default {
	login : async (email:string, password:string) : Promise<object | boolean>=>{
		// Ingresamos a la DB
		// Se busca usuario por el email
		const roleFound = await getRole(email) ;
		// Mostramos el usuario obtenido
		console.log('->login: rol "Obtenido" ',roleFound);
		// VALIDAMOS que tipo de usuario este
		// ? = Este es para comprobar si existe
		if((roleFound?.rol == Roles.GUIDE)){
			// obtenemos el guia 
			const guideFound = await getGuide(roleFound.email);
			console.log('-> GuindeFound :: ',guideFound);
			
			// validamos si el guia fue encontrado
			if (!guideFound) return false;
			// validamos los datos del objeto (USER)
			const passHash = guideFound?.password;
			// Desencriptamos y validamos password
			if (await verify(passHash, password)){
				// creamos el token 
				const token = await createToken( email, roleFound.rol, guideFound.id);
				// pasamos el token al cliente
				console.log('El token generado es:: ', token);
				//Objeto a retornar
				const guide = {
					role : roleFound.rol,
					name: guideFound.firstName,
					token: token
				};

				// Retornamos 
				return guide;
			}else {return false;}
		// Por el contrario, si el usuario es de tipo COMPAÑIA
		}else if (roleFound?.rol == Roles.COMPANY){

			// Obtener Objeto - compañia
			const companyFound = await getCompany(roleFound.email);
			// validamos si el guia fue encontrado
			if (!companyFound) return false;
			// validamos los datos del objeto (USER)
			const passHash = companyFound?.password;

			// Desencriptamos y validamos password
			if (await verify(passHash, password)){
				// creamos el token 
				const token = await createToken(email, roleFound.rol, companyFound.id);
				// pasamos el token al cliente
				console.log('El token generado es:: ', token);
				//Objeto a rotornar
				const company = {
					role : roleFound.rol, 
					name : companyFound.nameCompany,
					token : token
				}; 
				// Retornamos 
				return company;
			}
		}
		return false;
	},
};