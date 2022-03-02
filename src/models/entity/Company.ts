import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// LLamamos decorador 
@Entity()
// Exportamos y creamos la clase company 
export class Company {

    // llamamos los decoradores
    // para definir la tabla  
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    nameCompany : string;

    @Column()
    nit : string;

    @Column()
    phoneNumber : string;

    @Column()
    email : string;

    @Column()
    password : string;


};