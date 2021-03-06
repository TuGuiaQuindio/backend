////////////////////////////////////////////////
// Importamos
import { MySQLDataSource as dsource } from '../../../../config/connection/Mysql/datasources';
import { GuideSignup } from '../../../../interface/Guide/signup-guide';
//Entidad
import { Guide } from '../Guide';
//Trancision de datos tipo : Rol
import { createRoles } from './roles';
//////////////////////////////////////////
//IMPORTAMOS INTERFACES
import { GuideSignup_extra } from '../../../../interface/Guide/signup-guide.extra';
import { CompleteDataSql } from '../../../../interface/Guide/guideInfo';
//////////////////////////////////////////
//IMPORTAR FIND_GUIDE POR NoDocument
import { getGuideDoc } from './find.g-c';

// ?CREATE -> Registrar nuevo Guia 
export const createGuide = async (values: GuideSignup, publicId:string,password:string) : Promise<Guide | undefined> => {
	// Obtenemos el usuario a buscar
	const userFound : boolean | undefined = await getGuideDoc(values.NoDocument);
	console.log('Status User/Guide validado', userFound);
	// Validamos si el guia existe
	if(userFound) return undefined;
	// Obtengo los datos del cliente por parametro
	// Creamos objeto con datos
	console.error('Valores a guardar: ',values);
	const guide: GuideSignup = {
		publicId: publicId,
		NoDocument : values.NoDocument,
		firstName : values.firstName,
		lastName : values.lastName,
		rol: values.rol,
		// pass haseado
		password : password,
	};
	////////////////////////////////////////////////
	// Guardamos el email en ROLES
	const {email, rol} = guide.rol;
	const resultsRoles = await createRoles(email, rol);
	//se valida que el rol se haya registrado correctamente
	if (!resultsRoles) return undefined;
	///////////////////////////////////////////////
	// Por el contrario, si el usuario fue encontrado
	// Creamos el usuario
	const newGuide = dsource.getRepository(Guide).create(guide);
	// Guardamos el usuario creado
	const results = await dsource.getRepository(Guide).save(newGuide);
	console.log('results :: ', results);
	// Retornamos los resutados
	return results;
};
//? ////////////////////////////////////////////////////////////
//? ////////////////////////////////////////////////////////////
// ? UPDATE DATA
export const updateGuide = async ( id : number , values : GuideSignup_extra) => {
	//Actualizamos los datos
	//Si el dato es nulo
	if(!values.birthDate){
		//Dato birthDate vacio
		try{
			const results = await dsource.getRepository(Guide).update(id, {
				firstName : values.firstName,
				lastName : values.lastName,
				city : values.city,
				birthDate: null,
				phoneNumber : values.phoneNumber,
			});
			//Mostrar respuesta
			console.log('FROM UPDATEGUIDE -> ', results);
		}catch(err){
			console.log('ERROR ::  updateGuide :: ', err);
			//ERROR
			return false;
		}
	}

	//Por el contrario
	try{
		const results = await dsource.getRepository(Guide).update(id, {
			firstName : values.firstName,
			lastName : values.lastName,
			birthDate : values.birthDate,
			city : values.city,
			phoneNumber : values.phoneNumber,
		});
		//Mostrar respuesta
		console.log('FROM UPDATEGUIDE -> ', results);
	}catch(err){
		console.log('ERROR ::  updateGuide :: ', err);
		//ERROR
		return false;
	}
	//->TODO OK
	return true;
};

export const updatePass = async (id : number, pass : string) : Promise<boolean> => {
	console.log('updatePass : ', pass);
	
	try {
		const result = await dsource.getRepository(Guide).update(id , {
			password : pass
		});
		//Show results
		console.log('FROM updatePass-> ' ,result);
		
	} catch (err) {
		console.log('ERROR :: Update Password - ',err);		
		return false;
	}
	//ALL OK
	return true;
};

//? //////////////////////////////////////////////////////////////
//? //////////////////////////////////////////////////////////////
//? INSERT DATA
export const insertGuideData = async (id : number, values : CompleteDataSql ) : Promise<boolean> => {
	//INSERTAR DATOS
	try {
		const resultInsert = await dsource.getRepository(Guide)
			.update(id, {
				phoneNumber : values.phoneNumber,
				city : values.city,
				birthDate : values.birthDate,
				hasTransport : values.hasTransport
			});
		//Mostramos resultados
		console.log('Result Insert-> ',resultInsert);
	} catch (error) {
		console.log('ERROR al insertar datos <Guia>-> ',error);
		return false;
	}
	//ALL OK
	return true;
};
