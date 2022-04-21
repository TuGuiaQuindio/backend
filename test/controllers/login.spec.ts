//Importamos 
import app from '../../src/app';
import request from 'supertest';


//Test for login routes
describe('Login',() => {
	//Test for GET methods
	describe('GET methods', () => {
		it('', async () => {
			const response = await request(app)
				.get('/login');
			expect(response.status).toBe(200);
		});
	});
});