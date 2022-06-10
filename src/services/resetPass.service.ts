// Servicio para validar codigo 
// Resetear contraseña
/////////////////////////////////////////////////////////
//IMPORTAMOS TRANSACCIONES
import { isValidatedCode } from '../model/entity/nosql/transaction/redis/data';
import { updatePass } from '../model/entity/sql/transaction/guide';
import { updatePassword } from '../model/entity/sql/transaction/company';
import { getCompanyEmail, getGuideEmail } from '../model/entity/sql/transaction/find.g-c';
/////////////////////////////////////////////////////////
//IMPORTACIONES INTERFACES
import { ResetPass } from '../interface/dataRedis';
/////////////////////////////////////////////////////////
//IMPORTACIONES DE CONSTANTES
import { Roles } from '../constants/constants';
/////////////////////////////////////////////////////////
//IMPORTACIONES DE SERVICIOS
import bcryptService from './bcrypt.service';
/////////////////////////////////////////////////////////
//IMPORTACIONES DE ENTIDADES
import { Guide } from '../model/entity/sql/Guide';
import { Company } from '../model/entity/sql/Company';
/////////////////////////////////////////////////////////

//Validamos el codigo
export const validateCode = async (  code : string ) : Promise<null|undefined|object|boolean> => {
	try {
		const result : null|undefined|object = await isValidatedCode(code);
		console.log('Resultado servicioo: ',result);
		return result;
	} catch (error) {
		console.log('ERROR en transacciones: ',error);
		return false;
	}
};

//Validamos contraseñas
export const validatedPass = async (newPass : string, confirmPass : string) : Promise<boolean> => {
	if(newPass === confirmPass)return true;
	return false;
};

// Actualizar contraseña
export const changePass = async (values : ResetPass, newPass : string) : Promise<undefined|null|boolean> => {
	//Obtenemos los datos para cambiar contraseña
	// Email, Rol
	//Tipo usuario
	const userType = values.rol;  
	console.log('Tipo usuario: ',userType);
	// validamos el tipo de usuario
	if(userType == Roles.GUIDE){
		//GUIA
		console.log('GUIAA...');
		//Obtenemos email
		const email : string = values.email;
		//Buscamos el guia
		const foundGuide : Guide | null = await getGuideEmail(email);
		//Validmaos si existe
		if (!foundGuide) return null; // GUIDE not found
		//Obtenemos el id del Guia
		const id : number = foundGuide.id;
		//Hasheamos la contraseña
		const newPassHash : string = await bcryptService.bcryptHash(newPass);
		//Actualizamos la contraseña
		const resultUpdate : boolean = await updatePass(id, newPassHash);
		//Validamos si todo salio bien
		if (!resultUpdate) return false;//Si la respuesta es FALSE
		//ALL OK
		return true;
	}
	// Empresa
	console.log('EMPRESAA...');
	//Obtenemos email
	const email : string = values.email;
	//Buscamos el guia
	const foundCompany : Company | null = await getCompanyEmail(email);
	//Validmaos si existe
	if (!foundCompany) return null; // GUIDE not found
	console.log(foundCompany);	
	//Obtenemos el id del Guia
	const id : number = foundCompany.id;
	//Hasheamos la contraseña
	const newPassHash : string = await bcryptService.bcryptHash(newPass);
	console.log('>> ',newPassHash);
	
	//Actualizamos la contraseña
	const resultUpdate : boolean = await updatePassword(id, newPassHash);
	//Validamos si todo salio bien
	if (!resultUpdate) return false;//Si la respuesta es FALSE
	//ALL OK
	return true;
};