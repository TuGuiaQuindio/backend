import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
	schemaOptions :  {
		timestamps : true
	}
})
export class Language{

	@prop()
		name : string;
	
	@prop()
		experience : number;
}
