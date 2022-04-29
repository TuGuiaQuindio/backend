// Interfaz para tener el full registro del usuario guia

import { UserSignup } from '../user-signup';
//IMPORTAMOS la interfaz de info adeicional
import { Information } from './info';

//Configuracion del perfil
export interface GuideSignup_extra extends UserSignup {
    
    firstName : string;
    lastName : string;
    password : string;
    //Data extra
    dataOfBirth : number;
    city : string;
    phoneNumber : string;
    //Información adicional
    information : Information;
}