//IMPORTAMOS ENTIDADES
import { getGuideInfoAll } from '../model/entity/nosql/transaction/findInfo.g-c';
import { Guide } from '../model/entity/sql/Guide';
///////////////////////////////////////////////////////////////////////7///////////
//IMPORTAMOS TRANSACCIONES
import { getGuideId } from '../model/entity/sql/transaction/find.g-c';
///////////////////////////////////////////////////////////////////////7///////////
//IMPORTAMOS INTERFACES
import { GuideProfileData } from '../interface/Guide/guideInfo';
///////////////////////////////////////////////////////////////////////7///////////

export const getProfilesGuides = async ():Promise<boolean|Array<GuideProfileData>|null> => {
	//Obtenemos toda la info de los guias -> NoSql
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const getInfoGuides:any[] = await getGuideInfoAll();
	const listGuideNoSql:Array<any> = getInfoGuides;
	//Validar respuesta
	if(!getInfoGuides)return null;//Vacio -> datos no existen
	//All ok
	//Unimos informacion
	const listProfilePreview:boolean|Array<GuideProfileData> = await joinInfo(listGuideNoSql);

	return listProfilePreview;
};

const joinInfo = async (listGuideNoSql:Array<any>):Promise<boolean|Array<GuideProfileData>> => {
	// declarar lista donde se guardara los id de la informacion a organizar
	const listIdVisible = [];
	const listIdNotVisible = [];
	//lista que contiene los perfiles previos
	const listProfileNoSql = [];
	const listProfiles = [];

	for(const ele of listGuideNoSql){
		//Validamos la visibilidad de la informacion
		if(ele.visibility){
			//Visible el perfil
			console.log('**Perfil visible**');
			// se pasa la info
			const data = {
				id:ele.id,
				information:ele.information,
				availability:ele.availability,
				aboutMe:ele.aboutMe,
				verified:ele.verified,
				firstAid:ele.firstAid,
				visibility:ele.visibility
			};
			//Agregamos a lista
			listProfileNoSql.push(data);
			listIdVisible.push(ele.id);
			console.table(data);
			continue;
		}
		listIdNotVisible.push(ele.id);
	}
	console.log(`Perfiles visibles: ${listIdVisible}`);
	console.log(`Perfiles no visibles: ${listIdNotVisible}`);
	//Obtenemos todos los datos
	for(const ele of listProfileNoSql){
		//Hacemos confulta a MySQL
		const guideData:Guide|null = await getGuideId(ele.id);
		//Dato vacio
		if(!guideData)return false; //ERROR al obtener los datos
		//Se crea los datos definitivos
		const data:GuideProfileData = {
			id:ele.id,
			document:guideData.NoDocument,
			firstName:guideData.firstName,
			lastName:guideData.lastName,
			city:guideData.city,
			phoneNumber:guideData.phoneNumber,
			birthDate:guideData.birthDate,
			email:'',
			hasTransport:guideData.hasTransport,
			information:ele.information,
			availability:ele.availability,
			aboutMe:ele.aboutMe,
			verified:ele.verified,
			firstAid:ele.firstAid,
			visibility:ele.visibility
		} as GuideProfileData;

		//Agregamos datos
		listProfiles.push(data);
	}
	//Se crea los datos de la prevista del perfil
	console.table(listProfiles);
	
	//Retornamos la lista de los perfiles visibles
	return listProfiles;
};