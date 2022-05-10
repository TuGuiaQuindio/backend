import { prop, getModelForClass } from '@typegoose/typegoose';

export class CompanyInfo {
	
	@prop({
		type : String,
		required : true,
		trim : true,
	})
		id : number;

	@prop({
		type : String,
	})
		mainActivity : string;
}

//CREATE MODEL
console.log('CREANDO MODELO COMPANYINFO');

const CompanyInfoModel = getModelForClass(CompanyInfo);
export default CompanyInfoModel;