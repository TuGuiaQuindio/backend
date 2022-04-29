// Entidades del ORM
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import { Roles } from './Rol';

// LLamamos decorador 
@Entity()
// Exportamos y creamos la clase Guide 
export class Guide {
	// llamamos los decoradores
	// para definir la tabla  
	@PrimaryGeneratedColumn()
		id : number;

	@Column({default : null})
		NoDocument : string;

	@Column({default : null})
		firstName : string;

	@Column({default : null})
		lastName : string;

	@Column({default : null})
		dataOfBirth: number;

	@Column({default : null})
		city : string;

	@Column({default : null})
		phoneNumber : string;

	@OneToOne(()=> Roles)
	@JoinColumn()
		rol : Roles;

	@Column({default : null})
		password : string;

	// Foreign key
	// @ManyToOne(() => Roles, rol => rol.Guide )
	
}