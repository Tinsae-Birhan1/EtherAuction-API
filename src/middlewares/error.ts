import mongoose from 'mongoose';
import httpStatus from 'http-status';
import {NODE_ENV} from '../config/config';
import ApiError from '../utils/ApiError';
import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || (error instanceof mongoose.Error)
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, error.stack);
  }
  next(error);
};

const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err;
  if (NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[statusCode];
  }
  const response = {
    error: true,
    code: statusCode,
    message,
    ...(NODE_ENV === 'development' && { stack: err.stack }),
  };
  res.locals.errorMessage = message;
  if (NODE_ENV === 'development') {
    logger.error(err);
  }
  res.status(statusCode).send(response);
};

export {
  errorHandler,
  errorConverter,
};
