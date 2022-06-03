// COntrolador de CAMBIAR contraseña
import { Request, Response } from 'express';
////////////////////////////////////////////////////////////////
//IMPORTACIONES SERVICIOS
import { getId, getRole } from '../../services/token.service';
import { getResponse } from '../../services/response-message.service';
import { changePassword } from '../../services/Guide/changePass.service';
////////////////////////////////////////////////////////////////
//IMOPRTACIONES INTERFACES 
import { ChangePass } from '../../interface/change-password';
////////////////////////////////////////////////////////////////
//IMPORTAMOS CONSTATNTES
import { Roles } from '../../constants/role.constants';
////////////////////////////////////////////////////////////////

export const changePass_put = async ( req : Request, res : Response ) => {
	console.log('CHANGE PASSWORD - GUIDE');
	//OBTENEMOS TOKEN
	const authorization : string | undefined = req.headers.authorization;
	//OBTENEMOS ID  
	const id : number = await getId(authorization);
	//OBTENEMOS ROL
	const rol : number = await getRole(authorization);
	console.log('-> Payload - Guide :: ID :', id, '- ROl :',rol );
	//Validamos que el rol coincida
	// ROL GUIDE = 1
	if(rol != Roles.GUIDE) return res.status(403).json(getResponse('A002'));
	//VALIDAMOS EL ID 
	if(id == 0) return res.status(422).json({ error:'ID Not Found - Unauthorized' });
	//CONTINUA
	//OBTENEMOS LOS DATOS
	const { currentPassword, newPass, confirmPass } = req.body as ChangePass;
	//Validamos si la contraseña NUEVA ES VALIDA
	console.log(newPass, '-' , confirmPass);
	if(newPass !== confirmPass) return res.status(412).json(getResponse('P001'));
	//Cambiamos contraseña
	try {
		//
		const changePass : boolean | undefined | null = await changePassword(id , { currentPassword, newPass, confirmPass });
		console.log('Result Controller : ',changePass);
		//Validamos
		if (changePass == null) {
			return res.status(404).json();//User not found
		}else if(changePass === undefined){
			return res.status(412).json(getResponse('P003'));
		}else if(changePass == false){
			//Password Actual no coincide
			return res.status(406).json(getResponse('P002'));
		}
		//ALL OK
		return res.status(200).json(getResponse('P004'));
	} catch (err) {
		console.log(err);
	}
};