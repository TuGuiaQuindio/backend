//IMPORTAMOS INTERFACES
import { GuideProfileData } from '../../interface/Guide/guideInfo';
//IMPORTAMOS ENTIDADES
import { Guide } from '../../model/entity/sql/Guide';
//IMPORTAMOS TRANSACCIONES
import { getGuideId } from '../../model/entity/sql/transaction/find.g-c';
import { getGuideInfoOneId } from '../../model/entity/nosql/transaction/findInfo.g-c';
import { updateVisibility } from '../../model/entity/nosql/transaction/guide';

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
		firstName:dataGuide.firstName,	
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
		visibility: infoGuide?.visibility,
	} as GuideProfileData;
	return data ;
};

export const visibilityService = async (id:number,email:string,visibility:boolean):Promise<boolean|null> => {
	//validar si los datos existen
	const result = await getGuideInfoOneId(id);
	//VAlidamos resultado
	if(!result)return null; // Datos no existen
	//Continua
	const response:boolean = await updateVisibility(id,visibility);
	return response;
};