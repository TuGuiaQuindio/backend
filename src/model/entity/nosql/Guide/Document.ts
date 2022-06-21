import { prop, getModelForClass } from '@typegoose/typegoose';


export class DocumentGuide {

	@prop({
		lowercase: true,
		type: () => String})
		title : string;
	
	@prop()
		description : string;
	
	@prop({ type : ()=> String })
		originalName : string;

	@prop({type: () => Number})
		size : number;

	@prop({type: () => String})
		path : string;
	
}

//Create model
// const DocumentModel = getModelForClass(DocumentGuide);
// export default DocumentModel;