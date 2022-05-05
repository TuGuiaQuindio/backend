import { prop } from '@typegoose/typegoose';

export class Language{

	@prop()
		name : string;
	
	@prop()
		experience : number;
}
