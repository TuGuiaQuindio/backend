
import { UserSignup } from '../user-signup';

//Interface de Datos de registro de Empresa
export interface CompanySignup extends UserSignup {
    nit : string;
    nameCompany ?: string;
    phoneNumber ?: string;
    address ?: string;
}

//Interface de datos MySQL
export interface DataSql {
    id ?: number;
    nameCompany ?: string;
    phoneNumber ?: string;
    address ?: string;
}

//Interface de Datos NoSQL
export interface DataNoSql {
    mainActivity ?: string;
}

export interface CompleteDataSql{
    phoneNumber : string;
}