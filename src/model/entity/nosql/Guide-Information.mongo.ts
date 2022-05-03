import { Column } from 'typeorm';
import { Language } from './Guide-lenguage.mongo';

export class Information {
	
	// constructor(languages: Language[], theme: string) {
	// 	this.languages = languages;
	// 	this.theme = theme;
	// }
	
	@Column((type) => Language)
		languages: Language[];

	@Column()
		theme: string;
}