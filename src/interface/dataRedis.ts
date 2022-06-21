//
export interface DataRecover {
    email : string;
}

//Reset password
export interface ResetPass {
    code : string;
    email : string;
    rol : number;
}