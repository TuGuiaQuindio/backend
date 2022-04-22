// import 'reflect-metadata';
// import dotenv from 'dotenv';
// // dotenv.config({ path : './.env' });
// dotenv.config();

// import { MySQLDataSource as dsource }  from '../../src/config/datasources';
// jest.useFakeTimers();
// import { getRole, getGuide, getCompany } from '../../src/model/transactions/login';

// describe('PACKAGE TRANSACTIONS', () => {
// 	//Test function getGuide()
// 	describe('Transaction -> getGuide', () => {
// 		beforeAll(async () => {
// 			await dsource.initialize();
// 		});
// 		it('gets a non-null Guide from the transaction', async () => {
// 			const guide = await getGuide('jeico@gmail.com');
// 			expect(guide).toBeTruthy();
// 		});
// 		afterAll(async () => { await dsource.destroy();});
// 	});
// 	//Test function getRole()
// 	describe('Transaction -> getRole', () => {
// 		beforeAll(async () => {
// 			await dsource.initialize();
// 		});
// 		it('gets a non-null Guide from tha transaction', async () => {
// 			const role = await getRole('ana@gmail.com') ;
// 			expect(role).toBeTruthy();
// 		});
// 		afterAll(async () => { await dsource.destroy();});
// 	});
// 	//Test function getCompany()
// 	// describe('Transaction ->getCompany', () => {

// 	// });
// });
