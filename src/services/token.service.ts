import jwt from 'jsonwebtoken';

import config from '../config/index'
import { readFileSync } from 'fs';
import { join } from 'path';

// Generamos y validamos los tokens
// TODO -> Pasar al token el rol
export const createToken = async (email:string) => {
    const key = readFileSync(
        join(process.cwd(), '.secret', 'sign.key')
    )
    
    return jwt.sign( { email },key , { algorithm: 'RS256', expiresIn: 60 * 60 });
};


// Verificamos el token obtenido 
export const verifyToken = async ( token : string )=>{

    // leemos la llave
    const cert = readFileSync( join(process.cwd(), '.secret', 'sign.key') )
    // Tratamos 
    try {
    const decoded = jwt.verify(token, cert, { algorithms: ['RS256'] });
        return decoded;
    } catch(err) {
        // err
        console.log('Token ERROR:', err);

        return undefined;    
    }
    

}



