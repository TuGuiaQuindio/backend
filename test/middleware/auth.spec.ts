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
