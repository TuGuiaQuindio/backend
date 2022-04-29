//Documento que contendra los datos de los lenguajes

import { Column } from 'typeorm';

export class Language {

	constructor(name: string, experience: number){
		this.name = name;
		this.experience = experience;
	}

	@Column()
		name: string;

	@Column()
		experience: number;
}