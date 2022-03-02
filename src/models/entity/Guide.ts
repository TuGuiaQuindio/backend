// Entidades del ORM
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// LLamamos decorador 
@Entity()
// Exportamos y creamos la clase Guide 
export class Guide {

    // llamamos los decoradores
    // para definir la tabla  
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    document : string;

    @Column()
    firstName : string;

    @Column()
    lastName : string;

    @Column()
    cc : string;

    @Column()
    city : string;

    @Column()
    phoneNumber : string;

    @Column()
    email : string;

    @Column()
    password : string;


};