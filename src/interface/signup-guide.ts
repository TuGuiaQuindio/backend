
// Mientras se tendra datos locales
import { UserSignup } from './user-signup';

export interface GuideSignup extends UserSignup {

    // id:number;
    NoDocument:string;
    firstName:string;
    lastName:string;
    age:number;
    city:string;
    phoneNumber:string;

}
// Exportamos el objeto
