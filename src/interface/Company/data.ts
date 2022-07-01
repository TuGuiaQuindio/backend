
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

//entry data of vacancy 
export interface Vacancy{
    title:string;
    description:string;
    salary:number;
    schedule:string;
}

export interface DataVacancy {
    id:string;
    idCompany:number;
    title:string;
    description:string;
    salary:number;
    schedule:string;
    email: string;
    phoneNumber: number;
    address: string;
    publishedOn:Date;
}

export interface CompanyDataConfig {
    email:string;
    nit:string;
    phoneNumber:string;
    address:string;
    mainActivity:string;
}

//datos de aplicantes a la vacante
export interface DataApplicantVacancy {
    idGuide:number;
    email:string;
}

export interface DataCompany {
    id:number;
    mainActiviti:string;
    vacancies:[];
    nameCompany:string;
    email:string;
    nit:string;
    addres:string;
    phoneNumber:string;
}