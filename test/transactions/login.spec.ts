import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
// import mysqlOptions from '../../src/config/mysql-options';
import { MySQLDataSource as dsource }  from '../../src/config/datasources';
////////////////////////////////
//Import functions transactions
import { getRole, getGuide, getCompany } from '../../src/model/transactions/login';

// console.log(mysqlOptions);

describe('PACKAGE TRANSACTIONS', () => {
	//Test function getGuide()
	describe('Transaction -> getGuide', () => {
		// OPEN conenction DataBases 
		beforeAll(async () => { await dsource.initialize(); });

		it('gets a non-null GUIDE from the transaction', async () => {
			const guide = await getGuide('jeico@gmail.com');
			expect(guide).toBeTruthy();
		});
		//Close connection DataBase
		afterAll( async () => { await dsource.destroy(); });
	});
	//Test function getRole()
	describe('Transaction -> getRole', () => {
		// OPEN conenction DataBases 
		beforeAll(async () => { await dsource.initialize(); });
		it('gets a non-null ROLE from the transaction', async () => {
			const role = await getRole('ana@gmail.com') ;
			expect(role).toBeTruthy();
		});
		//Close connection DataBase
		afterAll(async () => { await dsource.destroy();});
	});
	//Test function getCompany()
	describe('Transaction -> getCompany', () => {
		// OPEN conenction DataBases 
		beforeAll(async () => { await dsource.initialize(); });
		it('gets a non-null COMPANY from the transaction', async () => {
			const compnay = await getCompany('company@gmail.com');
			expect(compnay).toBeTruthy();
		});
		//Close connection DataBase
		afterAll(async () => { await dsource.destroy();});
	});
});
