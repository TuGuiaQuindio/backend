import { prop, getModelForClass  } from '@typegoose/typegoose'; 

//IMPORTACIONES DE MODELOS
import { Information } from './Information';

//Creamos la clase
class GuideInfo {

	@prop({
		required : true,
		trim : true //Recortar los espacios '  145s ' -> '145s'
	}) // mongoose
		id : number; //TypeScript

	@prop()
		information : Information;
	
	@prop({
		type:Boolean,
		default : false
	})
		completeData:boolean;
}

//Create model
const GuideInfoModel = getModelForClass(GuideInfo);
export default GuideInfoModel;