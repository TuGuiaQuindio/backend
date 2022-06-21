//TESTING DE RUTA LOGIN

//Import config
import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import mysqlOptions from '../../src/config/mysql-options';
import { MySQLDataSource as dsource }  from '../../src/config/datasources';

//Importamos 
import app from '../../src/app';
import request from 'supertest';
// import { loginGet, loginPost } from '../../src/controllers/login.controller';

// console.log(process.env);
console.log(mysqlOptions);

/////////////////////// ////////////////////

// Test for login routes
describe('Login',() => {
	//Test for GET methods
	describe('GET methods', () => {
		//Open Data-Bases
		it('Responds with a Status 200', async () => {
			const response = await request(app)
				.get('/login');
			expect(response.status).toBe(200);
		});
	});
	describe('POST methods', () => {
		//Validado con respuesta 'OK'
		describe('Validated OK', () => {
			//Open Connection DataBase
			beforeAll( async () => { await dsource.initialize(); });
			it('Responds with a status 200', async () => {
				const response = await request(app)
					.post('/login')
					.send({
						email:'jeico@gmail.com',
						password:'12345678'
					});
				// console.log(dsource.initialize);
				expect(response.statusCode).toBe(200);
			});
			//Close connection DataBase
			afterAll( async () => { await dsource.destroy();});
		});
		//Errores de las validaciones
		describe('Validated ERRORS', () => {
			//Open Connection DataBase
			beforeAll( async () => { await dsource.initialize(); });
			it('Should responds with a 401 status code, for Invalid credentials', async () => {
				const response = await request(app)
					.post('/login')
					.send({ 
						email : 'exampleError@gmail.com', 
						password : '12345678'
					});
				expect(response.statusCode).toBe(401);
			});

			it('Should response with a 422 status code by becose semantics errors ', async () => {
				const response = await request(app)
					.post('/login')
					.send({});
				expect(response.statusCode).toBe(422);
			});
			//Close connection DataBase
			afterAll( async () => { await dsource.destroy();});
		});
	});
});