// En donde enciptamos todas las password
import bcrypt from 'bcrypt';
const saltRound = 10;

export default {
	// Encriptar password
	bcryptHash: async (pass:string) : Promise<string> => {
		//Hasheamos dato : pass
		const passHash = bcrypt.hashSync(pass, saltRound );
		return passHash;
	},

	verify : async function(passHash : string, password : string) : Promise<boolean> {
		// Comparamos el password haseado(DB) y el password llegado desde el cliente
		return bcrypt.compareSync(password, passHash);
	}
};
