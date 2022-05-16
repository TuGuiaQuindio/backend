import { prop, Ref, PropType } from '@typegoose/typegoose';

//IMPORTACIONES DE MODEL
import { Language } from './Language';
import { ImageGuide } from './Image';
import { DocumentGuide } from './Document';

export class Information {

	@prop({
		type: () => String,
		lowercase : true})
		theme : string;

	@prop({type: () => [Language]})//Es de tipo de dato de Language 
		language : Language[];
	
	//Referenciamos
	@prop({
		type: () => [ImageGuide],
		_id : false,})
		image : ImageGuide[];

	@prop({type: () => [DocumentGuide]})
		document : DocumentGuide[];
}
