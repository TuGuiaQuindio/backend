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
	describe('All valid', () => {
		beforeAll(async () => { await dsource.initialize(); });
		it('should respons with a TOKEN with a type of STRING', async () => {
			const response = await login('jeico@gmail.com', '12345678');
			expect(response).toBeTruthy();
			expect(typeof response).toBe('string');
		});
		it('Should responds wiyth un false', async () => {
			//Se le pasa datos vacios
			const responds = await login('','');
			expect(responds).toBe(false);
		});
		afterAll(async () => { await dsource.destroy(); });
	});
});
