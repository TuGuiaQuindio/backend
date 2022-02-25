
// Mientras se tendra datos locales
import { User } from './user';

export interface GuideSignup extends User {

    // id:number;
    firstName:string;
    lastName:string;
    age:number;
    cc:string;
    city:string;
    phoneNumber:string;

}
// Exportamos el objeto
