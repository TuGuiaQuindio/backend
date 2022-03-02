import jwt from 'jsonwebtoken';

import config from '../config/index'

// Generamos y validamos los tokens

// Funcion para verificar el token para 
// export const verifyToken = () => {
    

// };

export const createToken = (email:string, password:string) => {
    return jwt.sign( { email, password }, config.keyToken, { algorithm: 'RS256' });
};

// export default {

//     verifyToken : ()=>{

//     },

//     createToken : jwt.sign({}, config.keyToken ,{ algorithm: 'RS256' }, function(err, token) {
//         return token;
//     })

// };

