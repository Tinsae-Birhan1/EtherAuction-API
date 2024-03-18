import { Request, Response, NextFunction } from 'express';
import catchAsync from '../../src/utils/catchAsync';

describe('catchAsync', () => {
  it('should catch asynchronous errors', async () => {
    const asyncFn = jest.fn().mockRejectedValueOnce(new Error('Async error'));
    const wrappedFn = catchAsync(asyncFn);

    const mockReq = {} as Request;
    const mockRes = {} as Response;
    const mockNext = jest.fn() as NextFunction;

    await wrappedFn(mockReq, mockRes, mockNext);
    expect(asyncFn).toHaveBeenCalled();
  });

  it('should pass error to next function', async () => {
    const asyncFn = jest.fn().mockRejectedValueOnce(new Error('Async error'));
    const nextFn = jest.fn();
    const wrappedFn = catchAsync(asyncFn);

    const mockReq = {} as Request;
    const mockRes = {} as Response;
    const mockNext = nextFn as NextFunction;

    await wrappedFn(mockReq, mockRes, mockNext);
    expect(nextFn).toHaveBeenCalled();
  });
});
