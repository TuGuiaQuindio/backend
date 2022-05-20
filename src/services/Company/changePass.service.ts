//CAMBIAR CONTRASEÑA PARA EMPRESA

//SERVICIO DE CAMBIAR CONTRASEÑA
//////////////////////////////////////////////////////////////////
//IMPORTAMOS SERVICIOS
import bcrypt from '../bcrypt.service';
//////////////////////////////////////////////////////////////////
//IMPORTACIONES INTERFACES
import { ChangePass } from '../../interface/change-password';
//////////////////////////////////////////////////////////////////
//IMPORTACIONES ENTIDADES
import { getCompanyId } from '../../model/entity/sql/transaction/find.g-c';
//////////////////////////////////////////////////////////////////
//IMPORTACIONES TRANSACCIONES
import { updatePass } from '../../model/entity/sql/transaction/company';

export const changePassword = async ( id : number, values : ChangePass) : Promise<boolean | undefined | null> => {
	console.log('CHANGE PASSWORD SERVICE - GUIDE');
	//Buscamos Empresa por id
	const foundCompany = await getCompanyId(id);
	//Validamos si el usuario Empresa existe
	if(!foundCompany) return null; //User NOT exits
	//Continua
	//Validamos
	//SI la contraseña coincide con la guardada
	const currentPass : string = values.currentPassword;
	//Obtengo password SQL-DB
	const dbpass : string = foundCompany.password;
	//Las CONTRASEÑAS COINCIDEN
	const resultValidate : boolean = await bcrypt.verify(dbpass, currentPass);
	// Validamos la respuesta 
	if(!resultValidate) return false;//CONTRASEÑAS NO COINCIDEN

	// Encriptamos 
	// Valor nuevo
	const newPass : string = values.newPass;
	const newPassHass : string = await bcrypt.bcryptHash(newPass); 
	console.log('New Pass-> ',newPass);
	console.log('Hass -> ',newPassHass);
	
	// Actualizamos PASSWORD
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