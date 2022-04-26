

//Middleware
import { Request } from 'express';
import { isAuth } from '../../src/middleware/auth';
import { verifyToken } from '../../src/services/token.service';

jest.mock('../../src/services/token.service', () => ({
	...(jest.requireActual('../../src/services/token.service') as object),
	verifyToken: jest.fn().mockResolvedValue({role: 1})
}));

////j///////////////////////////
const mockReq = () => {
	const req = {headers : {authorization : 'Authorization'}};
	return req;
};

const mockRes = () => {
	const res = {
		status : undefined,
		json : undefined
	};
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res;
};

describe('TESTING MIDDLEWARE - isAuth', () => {
	it('should', async () => {
		const mockNext = jest.fn();
		const mockedReq: Partial<Request> = {};
		const mockedRes = mockRes() as any;
		const mockedEntries = {
			data : {}
		};

		// const result = isAuth(mockedReq, mockedRes, mockNext);
	});
});	
