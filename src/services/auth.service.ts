// import token from './token-services';


import { createToken }  from '../services/token.service'
import { getGuide } from '../controllers/guide.controller';
import bcrypt from '../services/bcrypt.service';

export default {

    login : async (email:string, password:string) =>{

        // Ingresamos a la DB
            
        const guideFound = await getGuide(email) ;
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
                return "Credenciales incorrectas"
            }

        }else{
            
            return("Datos no validos");
        }
        
    },
}