//IMPORTAMOS INTERFACES
import { GuideProfileData } from '../../interface/Guide/guideInfo';
import { Role } from '../../interface/rol';
//IMPORTAMOS ENTIDADES
import { getGuideInfoOneId } from '../../model/entity/nosql/transaction/findInfo.g-c';
import { Guide } from '../../model/entity/sql/Guide';
//IMPORTAMOS TRANSACCIONES
import { getGuideId, getRole } from '../../model/entity/sql/transaction/find.g-c';

export const profileService = async (id:number, email:string) : Promise<GuideProfileData|null> => {
	//Obtenemos los datos de -> mysql
	const dataGuide:Guide|null =  await getGuideId(id);
	//Validamos respuesta
	if(!dataGuide) return null;
	//Buscamos informacion -> MongoDB
	const infoGuide = await getGuideInfoOneId(id);
	//validmoas que este la informacion
	if (!infoGuide) {
		console.log('Obteniendo perfil...');
		//Buscamos rol
		// const getRol = getRole();
		//Crear datos
		const data:GuideProfileData = {
			id:dataGuide.id,
			document:dataGuide.NoDocument,
			fistName:dataGuide.firstName,	
			lastName:dataGuide.lastName,
			city:dataGuide.city,
			phoneNumber:dataGuide.phoneNumber,
			birthDate:dataGuide.birthDate,
			email:email,
			hasTransport:dataGuide.hasTransport,
		} as GuideProfileData;
		return data;
	}
	console.log('Obteniendo perfil...');
	
	//Creamos objeto para pasar los datos
	const data:GuideProfileData = {
		id:dataGuide.id,
		document:dataGuide.NoDocument,
		fistName:dataGuide.firstName,	
		lastName:dataGuide.lastName,
		city:dataGuide.city,
		phoneNumber:dataGuide.phoneNumber,
		birthDate:dataGuide.birthDate,
		email:email,
		hasTransport:dataGuide.hasTransport,
		information : infoGuide.information,
	} as GuideProfileData;
	return data ;
};