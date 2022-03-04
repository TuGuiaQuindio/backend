
// Mientras se tendra datos locales
import { User } from './user';

export interface GuideSignup extends User {

    // id:number;
    NoDocument:string;
    firstName:string;
    lastName:string;
    age:number;
    city:string;
    phoneNumber:string;

}
// Exportamos el objeto
