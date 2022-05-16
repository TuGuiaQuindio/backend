import { prop, modelOptions } from '@typegoose/typegoose';
@modelOptions({
	schemaOptions :  {
		_id: false,
	},
})
export class ImageGuide {

	// @prop({type: () => Number})
	// 	id : number;

	@prop({
		lowercase: true,
		type: () => String})
		title : string;
	
	@prop({ type: () => String })
		description : string;

	@prop({ type : ()=> String })
		originalName : string;

	@prop({ type: () => Number })
		size : number;

	@prop({ type: () => String })	
		path : string;

}

// Create model
// const ImageGuideModel = getModelForClass(ImageGuide);
// export default ImageGuideModel;