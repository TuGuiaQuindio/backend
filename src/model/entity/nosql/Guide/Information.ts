import { prop } from '@typegoose/typegoose';

//IMPORTACIONES DE MODEL
import { Language } from './Language';
export class Information {

	@prop()
		theme : string;

	@prop({type: () => [Language]})//Es de tipo de dato de Language 
		language : Language[];

}
