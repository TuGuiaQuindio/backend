import { prop } from '@typegoose/typegoose';

//IMPORTACIONES DE MODEL
import { Language } from './Language';
import { ImageGuide } from './Image';
import { DocumentGuide } from './Document';

export class Information {

	@prop({
		type: () => String,
		lowercase : true,
		default:'light'
	})
		theme : string;

	@prop({ type: () => [Language] })//Es de tipo de dato de Language 
		languages : Language[];
	
	//Referenciamos
	@prop({
		type: () => [ImageGuide],
		_id : false,})
		images : ImageGuide[];

	@prop({ type: () => [DocumentGuide] })
		documents : DocumentGuide[];

}
