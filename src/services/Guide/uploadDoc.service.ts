// IMPORTAMOS INTERFACES
import { GuideInfo } from '../../interface/Guide/guideInfo';

////////////////////////////////////////////////////////////////////
// IMPORTAMOS TRANSACCIONES
import { getGuideInfoOne } from '../../model/entity/nosql/transaction/find.g-c';
import { createInfoDoc } from '../../model/entity/nosql/transaction/guide';
////////////////////////////////////////////////////////////////////
//IMPORTAMOS ENTIDADES
import { DocumentGuide } from '../../model/entity/nosql/Guide/Document';

////////////////////////////////////////////////////////////////////
export const saveInfoDoc = async (id : number, values : GuideInfo) : Promise<boolean | undefined | null> => {
	console.log('----------------------------------------------------------------');
	console.log('SEARCHING INFO DOC...');
	//Buscamos si la info existe
	const foundInfoGuide = await getGuideInfoOne(id);
	console.log('-> ', foundInfoGuide);
	//Validamos si la info existe
	if(!foundInfoGuide){
		console.log('NOT EXIST INFORMATION');
		return null;
	}
	
	//OBTENEMOS DATOS DEL CLIENTE en matriz
	const dataCli : Array<DocumentGuide> = values.information.documents;
	//OBTENEMOS EL _id del objeto
	const objId : object = foundInfoGuide._id;
	//Obtenemos datos en matriz
	const dataInfoImg : Array<DocumentGuide> = foundInfoGuide.information.documents; 
	//Respuesta de validador -> si existe info previa
	const resultsData : boolean = await dataExist(dataInfoImg, dataCli); 
	console.log('** ',resultsData);
	
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
	const saveInfo : boolean = await createInfoDoc(objId,values);
	if(!saveInfo) return undefined;//ERROR
	//ALL OK
	return true;
};

async function dataExist( data : Array<DocumentGuide>, dataCli : Array<DocumentGuide> ) : Promise<boolean>{
	//Obtenemos la info
	const infoCli : DocumentGuide = dataCli[0];
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


////////////////////////////////////////////////////////////////////