import { prop, getModelForClass } from '@typegoose/typegoose';

export class Vacancies {

	@prop({
		type:String
	})
		id:string;

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
	
	@prop({
		type:String,
	})
		nameCompany:string;

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
	
	@prop({
		type:Date
	})
		publishedOn:Date;
	
	@prop({
		type: ()=>[Object],
		default:[]
	})
		applicants:Array<object>;

}	
//Creamos modelo
console.log('CREANDO MODELO VACANTES...');

const VacancyModel = getModelForClass(Vacancies);
export default VacancyModel;
