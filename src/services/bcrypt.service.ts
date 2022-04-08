// En donde enciptamos todas las password
import bcrypt from 'bcrypt';
const saltRound = 10;

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
};
