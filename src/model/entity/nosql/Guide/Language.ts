import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
	schemaOptions :  {
		timestamps : true,
		_id: false,
	},
})
export class Language{

	@prop({
		lowercase: true,
		type: () => String})

		name : string;
	
	@prop({type: () => String})
		experience : number;
}
