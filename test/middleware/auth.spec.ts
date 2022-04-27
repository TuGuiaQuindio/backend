
/*
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
*/

import { Request, Response, NextFunction } from 'express';
import { isAuth } from '../../src/middleware/auth';

describe('Authorization middleware', () => {

	let mockReq : Partial<Request>;
	let mockRes : Partial<Response>;
	const mockJson = jest.fn();
	const mockStatus = jest.fn();
	const nextFunction : NextFunction = jest.fn();

	beforeAll(() => {
		mockReq = {
			headers: {}
		},
		mockRes = {
			json : mockJson,
			status: mockStatus
		};
		mockJson.mockReturnValue(mockRes);
		mockStatus.mockReturnValue(mockRes);
	});

	it('Without authorization header', async () => {
		const expectedResponse = {
			msg: 'Unauthorized'
		};
		mockReq = {
			headers : {
			}
		};

		await isAuth(mockReq as Request, mockRes as Response, nextFunction);
		expect(mockRes.json).toBeCalledWith(expectedResponse);
	});

	it('With authorization header', async () =>{
		mockReq = {
			headers : {
				authorization : 'Bearer abc'
			}
		};
		await isAuth(mockReq as Request, mockRes as Response, nextFunction);
	});


});
