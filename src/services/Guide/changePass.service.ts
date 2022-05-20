//SERVICIO DE CAMBIAR CONTRASEÑA


//////////////////////////////////////////////////////////////////
//IMPORTAMOS SERVICIOS
import bcrypt from '../bcrypt.service';
//////////////////////////////////////////////////////////////////
//IMPORTACIONES ENTIDADES
import { getGuideId } from '../../model/entity/sql/transaction/find.g-c';
//////////////////////////////////////////////////////////////////
//IMPORTACIONES INTERFACES
import { ChangePass } from '../../interface/change-password';
//////////////////////////////////////////////////////////////////
//IMPORTAMOS TRANSACCIONES
import { updatePass } from '../../model/entity/sql/transaction/guide';



export const changePassword = async ( id : number, values : ChangePass) : Promise<boolean | undefined | null> => {
	console.log('CHANGE PASSWORD SERVICE - GUIDE');
	//Buscamos guia por id
	const foundGuide = await getGuideId(id);
	//Validamos si el usuario Guide existe
	if(!foundGuide) return null; //User NOT exits
	//Continua
	//Validamos
	//SI la contraseña coincide con la guardada
	const currentPass : string = values.currentPassword;
	//Obtengo password SQL-DB
	const dbpass : string = foundGuide.password;
	//Las CONTRASEÑAS COINCIDEN
	const resultValidate : boolean = await bcrypt.verify(dbpass, currentPass);
	// Validamos la respuesta 
	if(!resultValidate) return false;//CONTRASEÑAS NO COINCIDEN

	// Encriptamos 
	// Valor nuevo
	const newPass : string = values.newPass;
	const newPassHass : string = await bcrypt.bcryptHash(newPass); 
	console.log('Hass -> ',newPassHass);
	
	//Actualizamos PASSWORD
	try {
		const resultUpdate = await updatePass(id, newPassHass);
		console.log('Result Service Update : ',resultUpdate);
	} catch (error) {
		console.log(error);
		return undefined;//UN error en la actualizacion
	}
	//COINCIDEN - CONTINUE
	console.log('-ALL OK-');
	return true;
};