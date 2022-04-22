//Import config
import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import mysqlOptions from '../../src/config/mysql-options';
import { MySQLDataSource as dsource }  from '../../src/config/datasources';
jest.useFakeTimers();

//Importamos 
import app from '../../src/app';
import request from 'supertest';
// import { loginGet, loginPost } from '../../src/controllers/login.controller';

// jest.setTimeout(15000);

// console.log(process.env);
console.log(mysqlOptions);

/////////////////////// ////////////////////
//Test for GET methods
describe('GET methods', () => {
	//Open Data-Bases
	beforeAll(async () => { await dsource.initialize(); });
	it('Responds with a Status 200', async () => {
		const response = await request(app)
			.get('/login');
		expect(response.status).toBe(200);
	});
	// it('Responds msg with Login-GET', async () => {
	// 	const response = await loginGet();
	// });
	//Close Data-Bases
	afterAll(async () => { await dsource.destroy();});
});


//Test for login routes
// describe('Login',() => {
// 	describe('POST methods', () => {
// 		//Connection DataBase
// 		beforeAll(async () => { await dsource.initialize(); });
// 		it('Responds with a status 200', async () => {
// 			const response = await request(app)
// 				.post('/login')
// 				// .type('json');
// 				.send({
// 					email:'jeico@gmail.com',
// 					password:'12345678'
// 				});
// 			expect(response.statusCode).toBe(200);
// 		});
// 		//Disconnect DataBase
// 		afterAll(async () => { await dsource.destroy();});
// 	});
// });