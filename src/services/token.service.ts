import jwt from 'jsonwebtoken';

import config from '../config/index'
import { readFileSync } from 'fs';
import { join } from 'path';

// Generamos y validamos los tokens

// Funcion para verificar el token para 
// export const verifyToken = () => {
    

// };



export const createToken = async (email:string) => {
    const key = readFileSync(
        join(process.cwd(), '.secret', 'sign.key')
    ) 
    return jwt.sign( { email },key , { algorithm: 'RS256' });
};




// export default {

//     verifyToken : ()=>{

//     },

//     createToken : jwt.sign({}, config.keyToken ,{ algorithm: 'RS256' }, function(err, token) {
//         return token;
//     })

// };

