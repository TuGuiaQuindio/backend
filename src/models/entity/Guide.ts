// Entidades del ORM
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

// import { Roles } from './Roles'

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

    @Column()
    email : string;

    @Column()
    password : string;


};