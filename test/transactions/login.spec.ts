import { getRole, getGuide, getCompany } from '../../src/model/transactions/login';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

describe('Transaction -> getGuide', () => {
	createConnection();
	it('gets a non-null Guide from the transaction', async () => {
		const role = await getGuide('jeico@gmail.com');
		expect(role).toBeTruthy();
	});
	it('gets a null Guide from tha transaction', async () => {

	});
});
