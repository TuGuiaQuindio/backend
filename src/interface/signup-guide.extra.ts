// Interfaz para tener el full registro del usuario guia

import { UserSignup } from './user-signup';

export interface GuideSignup_extra extends UserSignup {

    //Full datos del usuario
    NoDocument:string;
    firstName:string;
    lastName:string;
    age:number;
    city:string;
    phoneNumber:string;
}