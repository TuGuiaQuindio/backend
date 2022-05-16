/////////////////////////////////////////////////////////////
// IMPORTAMOS INTERFACES
import { GuideInfo } from '../../interface/Guide/guideInfo';
/////////////////////////////////////////////////////////////
// IMPORTAMOS TRANSACCIONES
import { createInfoImg, updateInfoImg } from '../../model/entity/nosql/transaction/guide';
import { getGuideInfoOne } from '../../model/entity/nosql/transaction/find.g-c';
import { ImageGuide } from '../../model/entity/nosql/Guide/Image';
/////////////////////////////////////////////////////////////


//Guardamos los datos del archivo
export const saveInfoImg = async ( id: number, values : GuideInfo) : Promise<boolean | undefined | null> => {
	console.log('SEARCHING IMG...');
	//Buscamos si exite la Info de foto
	const foundInfoGuide = await getGuideInfoOne(id);
	console.log('results guideInfo: : ',foundInfoGuide,'\n',values.information.images);
	//Validamos si la info EXISTE
	if (!foundInfoGuide) {
		console.log('INFORMACION NO EXISTE');
		return null;
	}
	
	//OBTENEMOS DATOS DEL CLIENTE
	const dataCli : Array<ImageGuide> = values.information.images;
	//Obtenemos el _id del objeto encontrado
	const objId : object = foundInfoGuide._id;
	//Obtenemos datos en matriz
	const dataInfoImg : Array<ImageGuide> = foundInfoGuide.information.image;
	//Obtenemos validador -> si existe info previa
	const resultsData : boolean = await dataExist(dataInfoImg, dataCli); 
	//Si los datos existen
	//NO crear
	if(resultsData){//TRUE
		console.log('Info Foto ya existe',resultsData);
		//DATOS EXISTEN
		return false;
	}
	//Si los datos NO existen
	//Crear
	console.log('SAVING...');
	//Actulizamos
	const saveInfo : boolean = await createInfoImg(objId, values);
	if(!saveInfo) return undefined;//ERROR
	//ALL OK
	return true;
};


/////////////////////////////////////////////////////////////
//VALIDAMOS SI LA INFO YA EXISTE
async function dataExist( data : Array<ImageGuide>, dataCli : Array<ImageGuide> ) : Promise<boolean> {
	//
	const infoCli : ImageGuide = dataCli[0];
	//Obtemos el nombre del archivo del cliente
	const origNameCli : string = infoCli.originalName; 
	//Pasamos por cada objeto obteniendo el nombre del archivo
	let validador = false;
	for(const infoObj of data){
		//validamos cada nombres
		if(origNameCli == infoObj.originalName){
			//Ya existe
			validador = true;
		}
	}
	return validador;
}

/////////////////////////////////////////////////////////////
//Obtener el tipo de archivo
export const pullApartMimetype = async (data : string) : Promise<string> => {
	//Separamos lo ontenido
	return data.split('/')[0];
};