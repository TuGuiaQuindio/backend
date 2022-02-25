
// En donde enciptamos todas las password
const bcrypt = require('bcrypt');
const saltRound:number = 10

export default {
    // TODO -> Terminar la funcion de Bcrypt
    // Encriptar password
    bcryptHash: function(pass:string){
        
        const passHash = bcrypt.hashSync(pass, saltRound );

    }
}
