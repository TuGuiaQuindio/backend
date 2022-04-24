import bcrypt from '../../src/services/bcrypt.service';

const { bcryptHash, verify } = bcrypt;

let hash : string ;

//Testing functions bcryp
describe('--- TESTING BCRYP ---', () => {
	//Hasheamos el dato de entrada
	describe('Hashing data!', () => {
		it('should responds with a Hash', async () => {
			hash = await bcryptHash('123456789');
			// console.log(hash);
			expect(hash).toBeTruthy();
		});
		it('Responds with a verification of the hash and the data: boolean : TRUE', async () => {
			const responds = await verify(hash, '123456789');
			// console.log(responds);
			expect(responds).toBeTruthy();
			expect(responds).toBe(true);
		});
		//Se pasa dos parametros, el hash y un dato que no coincida al verificarlo
		it('Should responds a boolean : FALSE', async () => {
			const responds = await verify(hash, '3214');
			expect(responds).not;
			expect(responds).toBe(false);
		});
	});

});
