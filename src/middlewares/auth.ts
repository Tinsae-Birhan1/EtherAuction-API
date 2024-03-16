import httpStatus from 'http-status';
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';

declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}

const verifyCallBack = (req: Request, resolve: () => void, reject: (error: Error) => void) => async (err: Error, user: any, info: any) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'please authenticate'));
  }

  req.user = user;
  resolve();
};

const auth = async (req: Request, res: Response, next: NextFunction) =>
  new Promise<void>((resolve, reject) => {
    passport.authenticate(
      'jwt',
      { session: false },
      verifyCallBack(req, resolve, reject),
    )(req, res, next);
  })
    .then(() => next())
    .catch((error: Error) => next(error));

export default auth;
