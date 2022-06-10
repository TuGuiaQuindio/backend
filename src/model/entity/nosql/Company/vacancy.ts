import { prop, getModelForClass } from '@typegoose/typegoose';

export class Vacancies {

	@prop({
		type:Number
	})
		idCompany:number;

	@prop({
		type:String
	})
		title:string;
	
	@prop({
		type:String
	})
		description:string;
	
	@prop({
		type:Number
	})
		salary:number;
	
	@prop({
		type:String
	})
		schedule:string;
	
	// @prop({
	// 	type:String
	// })
	// 	publishedOn:string;

	@prop({
		type:String
	})
		email:string;
	
	@prop({
		type:String
	})
		phoneNumber:string;

	@prop({
		type:String
	})
		address:string;
	
}	
//Creamos modelo
console.log('CREANDO MODELO VACANTES...');

const VacancyModel = getModelForClass(Vacancies);
export default VacancyModel;
