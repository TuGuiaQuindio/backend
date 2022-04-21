//Importamos 
import app from '../../src/app';
import request from 'supertest';


//Test for login routes
describe('Login',() => {
	//Test for GET methods
	describe('GET methods', () => {
		it('Responds with a Status 200', async () => {
			const response = await request(app)
				.get('/login');
			expect(response.status).toBe(200);
		});
	});
	// describe('POST methods', () => {
	// 	it('Responds with a status 200', async () => {
	// 		const response = await request(app)
	// 			.post('/login')
	// 			// .type('json');
	// 			.send({
	// 				email:'jeico@gmail.com',
	// 				password:'12345678'
	// 			});
	// 		expect(response.statusCode).toBe(200);
	// 	});
	// });
});