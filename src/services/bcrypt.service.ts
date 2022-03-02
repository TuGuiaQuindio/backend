
// En donde enciptamos todas las password
const bcrypt = require('bcrypt');
const saltRound:number = 10

export default {
    // TODO -> Terminar la funcion de Bcrypt
    // Encriptar password
    bcryptHash: function(pass:string){
        
        const passHash = bcrypt.hashSync(pass, saltRound );
        
        return passHash;
    },

    verify : function(passHash : string, password : string){
        // Comparamos el password haseado(DB) y el password llegado desde el cliente
        return bcrypt.compareSync(passHash, password);
    }
}
