// importamos las funciones de service
import { createToken, verifyToken } from '../../src/services/token.service';

let token : string;

describe('VERIFY TOKEN', () => {
	//Verificamos que el token se cree y exita
	describe('Verify created Token', () => {
		
		it('should responds with a created token ', async () => { 
			token = await createToken('example@gmail.com', 1);
			console.log('Token created -> ',token);
			expect(token).toBeTruthy;
		});
	});
	//Se verifica que decodifique el token
	describe('Decoded token', () => { 
		it('Should responds with the token decoded', async () => {
			const response = await [verifyToken(token)];
			console.log('Decoded ->',response);
			expect(response).toBeTruthy();
		});
	});
});