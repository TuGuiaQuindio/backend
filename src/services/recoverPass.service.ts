////////////////////////////////////////////////////////
//IPORTAMOS TRANSACCIONES
import { getRole } from '../model/entity/sql/transaction/find.g-c';
import { saveCode } from '../model/entity/nosql/transaction/redis/data';
////////////////////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { DataRecover } from '../interface/dataRedis';
////////////////////////////////////////////////////////
//IMPORTAMOS SERVICIOS
import { sendEmailRecoveyPass } from './sendMenssage.service';
import { createCodeRecovery } from './generateCode.service';
////////////////////////////////////////////////////////

export const recoverPass = async (values : DataRecover ) : Promise<boolean | string | null | undefined> => {
	// Validamos si el email existe
	const foundRol = await getRole(values.email); 
	console.log(foundRol);
	if(!foundRol) return null;//User not exist
	//Obtenemos los datos
	const email :  string = foundRol.email;
	const rol : number = foundRol.rol;
	// Exist
	//Se crea el token 
	try {
		//creamos el 'token'
		const codeRecovery : string = await createCodeRecovery();
		console.log('-> ',codeRecovery);
		//!Almacenamos 'codigo' 
		const response : boolean|null = await saveCode(codeRecovery, email, rol);
		console.log('Response Code: ',response);
		//Validamos la respuesta
		if (response === false){
			return undefined;
		}else if(response === null) {
			//Token ya exite
			return 'exists';
		}
		// ALL OK
		//True
		//SE ENVIA CODE Y RUTA DE AUTENTIFICACION 
		//Se envia correo
		await sendEmailRecoveyPass(codeRecovery,email);
		////////////////////
		return codeRecovery;
	} catch (error) {
		//Algo salio mal
		console.log('Error al generar o guardar el Codigo: ', error);
		return false;
	}
};
