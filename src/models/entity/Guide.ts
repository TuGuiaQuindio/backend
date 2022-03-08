// Entidades del ORM
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import { Roles } from './Roles'

// LLamamos decorador 
@Entity()
// Exportamos y creamos la clase Guide 
export class Guide {

    // llamamos los decoradores
    // para definir la tabla  
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    NoDocument : string;

    @Column()
    firstName : string;

    @Column()
    lastName : string;

    @Column()
    city : string;

    @Column()
    phoneNumber : string;

    @OneToOne(()=> Roles)
    @JoinColumn()
    email : String;

    @Column()
    password : string;


     // Foreign key
    // @ManyToOne(() => Roles, rol => rol.Guide )
    
};