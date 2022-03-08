// Entidad del ORM Roles

import { Entity, Column, PrimaryColumn } from "typeorm";
import type from 'typeorm';

@Entity()

export class Roles {

    // Definimos la tabla columna 

    @PrimaryColumn('char',{length : 60})
    email : string;

    @Column('smallint')
    rol : string;

};