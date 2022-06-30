// Interfas de guia de informacion
export interface GuideInfo {
    document ?: string;
    information : Information;
}

export interface GuideInfoAdditional{
    availability:string;
    aboutMe:string;
    verified:boolean;
    firstAid:boolean;   
}

interface Information {
    theme : string;
    languages : Language[];
    images : Image[]; 
    documents : Document[];
    //datos
    completeData:boolean;
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
export interface CompleteDataSql{
    phoneNumber : string;
    city : string;
    birthDate : Date;
    hasTransport : boolean;
}

export interface CompleteDataNoSql{
    availability:string;
    aboutMe:string;
    verified:boolean;
    firstAid:boolean;
}

export interface GuideProfileData{
    id :number;
    publicId:string;
    document:string;
    firstName:string;
    lastName:string;
    city:string;
    phoneNumber:string
    birthDate:Date;
    email:string;
    hasTransport:boolean;
    information : Information;
    availability:string;
    aboutMe:string;
    verified:boolean;
    firstAid:boolean;
    visibility:boolean;
}
export interface GuideDataConfig {
    document:string;
    email:string;
    phoneNumber:string;
    birthData:Date;
    city:string;
    hasTransport:boolean;
}

// export interface ProfilePreview{
//     id:number;
//     firstName:string;
//     lastName:string;
//     aboutMe:string;
//     firstAid:boolean;
//     hasTransport:boolean;
//     languages:Language[];
//     // documents:Attachments;
// }