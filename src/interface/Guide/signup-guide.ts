
// Mientras se tendra datos locales
import { UserSignup } from '../user-signup';

export interface GuideSignup extends UserSignup {

    publicId?:string;
    NoDocument:string;
    firstName:string;
    lastName:string;
}
// Exportamos el objeto
