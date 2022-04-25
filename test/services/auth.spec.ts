import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import { MySQLDataSource as dsource } from '../../src/config/datasources';
/////////////////////////////////////
//import function
import auth from '../../src/services/auth.service';

//Deconstrucciona
const { login } = auth;

describe('--- Authentication service ---', () => {
	beforeAll(async () => { await dsource.initialize(); });
	describe('All valid', () => {
		it('should respons with a TOKEN', async () => {
			const response = await login('jeico@gmail.com', '12345678');
			// TODO -> VALIDAR QUE RESPONDA CON UN TOKEN
			expect(response).toBeTruthy();
		});
	});
	afterAll(async () => { await dsource.destroy(); });
});
