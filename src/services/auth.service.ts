// import token from './token-services';


import { createToken }  from '../services/token.service'
import { getGuide } from '../controllers/guide.controller';
import bcrypt from '../services/bcrypt.service';

export default {
// TODO -> ORGANIZAR EL LOGIN PARA GUIAS Y EMPRESAS
    login : async (email:string, password:string) =>{

        // Ingresamos a la DB
        // Se busca usuario por el email
        const guideFound = await getGuide(email) ;
        // Mostramos el usuario obtenido
        console.log("->login: ",guideFound);
        // Devolvera un true si lo encontro
        if (guideFound) {            
            //obtenemos la password para
            const passHash = guideFound.password;
            console.log(passHash, password)
            // validamos el password
            if (bcrypt.verify(passHash, password)){
                // creamos el token 
                const token = await createToken(email);
                // pasamos el token al cliente
                console.log("El token generado es:: ", token);
                
                // Retornamos 
                return token;

            } else {
                return false;
            }

        }else{
            
            return false;
        }
        
    },
}