//IMPORTAMOS INTERFACES
import { GuideProfileData } from '../../interface/Guide/guideInfo';
//IMPORTAMOS ENTIDADES
import { getGuideInfoOneId } from '../../model/entity/nosql/transaction/findInfo.g-c';
import { Guide } from '../../model/entity/sql/Guide';
//IMPORTAMOS TRANSACCIONES
import { getGuideId } from '../../model/entity/sql/transaction/find.g-c';

export const profileService = async (id:number, email:string) : Promise<GuideProfileData|null> => {
	//Obtenemos los datos de -> mysql
	const dataGuide:Guide|null =  await getGuideId(id);
	//Validamos respuesta
	if(!dataGuide) return null;
	//Buscamos informacion -> MongoDB
	const infoGuide = await getGuideInfoOneId(id);

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
		information : infoGuide?.information || null,
		availability: infoGuide?.availability || null,
		aboutMe: infoGuide?.aboutMe || null,
		verified: infoGuide?.verified || false,
		firstAid: infoGuide?.firstAid || null,

	} as GuideProfileData;
	return data ;
};