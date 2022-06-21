//TESTING QUE NOS DEVUELVE UN TOKEN

// importamos las funciones de service
import { createToken, verifyToken } from '../../src/services/token.service';

let token : string;

describe('VERIFY TOKEN', () => {
	//Verificamos que el token se cree y exita
	describe('Verify created Token', () => {
		
		it('should responds with a created token ', async () => { 
			token = await createToken('example@gmail.com', 1);
			console.log('Token created -> ',token);
			//Debe de existir el token
			expect(token).toBeTruthy;
		});
	});
	//Se verifica que decodifique el token
	describe('Decoded token', () => { 
		it('Should responds with the token decoded', async () => {
			const responds = await [verifyToken(token)];
			console.log('Decoded ->',responds);
			//Debe de existir
			expect(responds).toBeTruthy();
		});
	});
	//Validar que el token exprire
	describe('Token Expiration', () => {
		it('should responds with a TOKEN expired', async () => {
			const responds = await createToken('example@gmail.com,', 2, { expiresIn : -1 } );
			const decoded = await verifyToken(responds);
			//Su respuesta debe ser falso | undefined | '0'
			expect(decoded).toBeFalsy();
			
		});
	});
});