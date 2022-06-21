// Interfaz para tener el full registro del usuario guia

//Configuracion del perfil
export interface GuideSignup_extra{
    
    id ?: number;
    firstName ?: string;
    lastName ?: string;
    password ?: string;
    //Data extra
    birthDate ?: number;
    city ?: string;
    phoneNumber ?: string;
}