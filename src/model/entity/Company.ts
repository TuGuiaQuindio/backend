import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import { Roles } from './Rol';
// LLamamos decorador 
@Entity()
// Exportamos y creamos la clase company 
export class Company {

	// llamamos los decoradores
	// para definir la tabla  
	@PrimaryGeneratedColumn()
		id : number;

	@Column({default : null})
		nameCompany : string;

	@Column({default : null})
		nit : string;

	@Column({default : null})
		phoneNumber : string;

	@Column({default : null})
		direction : string;

	@Column({default : null})
		mainActivity : string;

	@OneToOne(()=> Roles)
	@JoinColumn()
		rol : Roles;

	@Column({default : null})
		password : string;


}