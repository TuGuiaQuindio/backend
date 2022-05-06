//actualizar los datos
////////////////////////////////////////////////
// IMPORTAMOS MODEL
import GuideInfoModel from '../Guide-info';
//IMPORACIONES DE INTERFACES
import { GuideInfo } from '../../../../interface/Guide/guideInfo';
///////////////////////////////////////////////////////////////
//IMPORTACIONES

//ACTUALIZAR INFORMACION GUIA
export const updateGuideInfo = async ( values : GuideInfo ) : Promise<boolean> => {
	//Obtenemos el id
	const id : number = values.id;
	try {
		//Actualizamos los datos
		const results : null | GuideInfo = await GuideInfoModel.findOneAndUpdate({id}, {
			information : {
				theme : values.information.theme,
				language : values.information.languages
			}
		});
		//Show Results
		console.log('RESULTS Update OK-> ',results);

	} catch (error) {
		console.log('ERROR updating DATA = ', error);
		return false;
	}
	//OK ALL
	return true;
};