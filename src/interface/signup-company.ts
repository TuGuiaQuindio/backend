
import { UserSignup } from './user-signup';

export interface CompanySignup extends UserSignup {
    nameCompany : string;
    nit : string;
    phoneNumber : string;
    direction : string;
    mainActivity : string; 
    
}