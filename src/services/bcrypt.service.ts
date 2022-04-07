
// En donde enciptamos todas las password
const bcrypt = require('bcrypt');
const saltRound:number = 10

export default {
    // Encriptar password
    bcryptHash: function(pass:string){
        
        const passHash = bcrypt.hashSync(pass, saltRound );
        
        return passHash;
    },

    verify : function(passHash : string, password : string) : boolean{
        // Comparamos el password haseado(DB) y el password llegado desde el cliente
        return bcrypt.compareSync(password, passHash);
    }
}
