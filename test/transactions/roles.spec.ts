/*
import { createRoles } from '../../src/model/transactions/roles';
import dotenv from 'dotenv';
import { MySQLDataSource } from '../../src/config/datasources';
import { Roles } from '../../src/model/entity/Rol';
dotenv.config({path: '.env'});

const createRolesMock = jest.fn(createRoles);
jest.mock('../../src/config/datasources', () => ({
	MySQLDataSource: jest.fn().mockImplementation(() => ({
		getRepository: jest.fn(() => ({
			create: jest.fn().mockReturnValue({
				email: 'test@email.com',
				rol: 2
			} as Roles),
			save: jest.fn().mockReturnValue({
				email: 'test@email.com',
				rol: 2
			})
		}))
	}))
}));

describe('Function Transaction Roles', () => { 
	it('', async () => {
		// const data = await createRoles('example@gmail.com', 2);
		// const responds = await createRolesMock('example@gmail.com', 2);
		// console.log(responds);
		// console.log(createRolesMock.mock.calls);
		console.log();
		expect(false).toBe(true);
	});
});
*/