import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import { Roles } from './Roles';
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
    direction : string;

    @Column()
    mainActivity : string;

    @OneToOne(()=> Roles)
    @JoinColumn()
    email : Roles;

    @Column()
    password : string;


};