// Interfas de guia de informacion
export interface GuideInfo {
    id :number;
    document ?: string;
    information : Information;
}

interface Information {

    languages : Language[];
    theme : string;
    images : Image[]; 
    documents : Document[];
}
interface Language {
    name : string;
    experience : number;
}
export interface Image {
    title : string;
    description : string;
    originalName : string;
    size : number;
    path : string;
}
export interface Document{
    title : string;
    description : string;
    originalName : string;
    size : number;
    path : string;
}

//COMPLETAR INFORMACION
export interface CompleteData{
    phoneNumber : string;
    city : string;
    birthDate : Date;
    hasTransporter : boolean;
}