//CONTROLADOR DE PROFILE/CONFIG
import { Request, Response } from 'express';

/////////////////////////////////////////
// IMPORTAMOS SERVICIOS
import { updateData } from '../../services/update.service';
import { pullApartToken, verifyToken } from '../../services/token.service';
////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { GuideSignup_extra } from '../../interface/Guide/signup-guide.extra';
import { Payload } from '../../interface/payload-token';
////////////////////////////////////////////////////////////////

//->> RUTA POST
//Validar datos de entrada
export const profileConfig_put = async (req:Request, res:Response) => { 
	//Obtenemos cabecera
	// const { authorization } = req.headers;
	const authorization : string | undefined = req.headers.authorization;
	//Obtenemos el ID del Headers
	const id : number = await getId(authorization);
	console.log('-> ID payload :: ', id);
	if(id == 0) return res.status(500).json({ error:'ID Not Found - Unauthorized' });
	
	// Get Data to configure for the 'Body'
	const { firstName, lastName, dataOfBirth, city, phoneNumber, information } = req.body as GuideSignup_extra;
	// console.log('Id user to update :: ',id);
	//Save or update data in MySQL and MongoDB
	try {
		const registerMysql : boolean | undefined = await updateData( { id, firstName, lastName, dataOfBirth, city, phoneNumber}, 'mysql' );
		const registerMongo : boolean | undefined = await updateData( { information }, 'mongodb' );
		//TODO -> ORGANIZAR LAS FUNCIONES A LLAMAR
		//Validar si los datos estan guardados correctamente	
		// !if(!registerMongo || !registerMysql) {
		if(registerMysql == undefined){//Undefined
			return res.status(404).json({ msg : 'Error :: User doesn`t exist' });
		
		}else if(!registerMysql){//false
			return res.status(500).json({ msg : 'ERROR :: There was an error updating data'});
		}else {//True
			//Existe el registro
			return res.status(200).json({ msg : 'User update'});
		}
	}catch(err){
		console.log(err);
		res.status(500).json({ msg : 'Error :: ' });
	}
};

//Funcion solo para obtener el token
async function getToken(authorization ?: string) : Promise<string>{
	//VAlidamos de que si llegue
	if (!authorization) return '';
	//Decodificamos cabecera para asi obtener el id
	const token : string = await pullApartToken( authorization );
	return token;
}

//Obtenemos el ID que nos da el token en el payload
async function getId( authorization ?: string) : Promise<number> {
	//Validamos el token
	if (!authorization) return 0;
	//Obtenemos el token
	const token : string = await getToken( authorization );
	//Decode token
	const decodeToken = await verifyToken(token) as Payload;
	//Data token
	//Decosntruccion, {id}
	const { id } = decodeToken;
	return id;
}