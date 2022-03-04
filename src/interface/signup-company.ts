
import { User } from './user';

export interface CompanySignup extends User {
    // ***TODO -> Mirar bien cuales datos se pediran
    nameCompany : string;
    nit : string;
    phoneNumber : string;
    direction : string;
    mainActivity : string; 
    
}