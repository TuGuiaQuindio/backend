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

	@Column({default:null})
		publicId:string;
	
	@Column({default : null})
		NoDocument : string;

	@Column({default : null})
		firstName : string;

	@Column({default : null})
		lastName : string;

	@Column({
		type: 'date',
		default : null,
		nullable: true,
	})
		birthDate: Date | null;

	@Column({default : null})
		city : string;
	
	@Column({
		type: 'boolean',
		default : null
	})
		hasTransport : boolean;

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