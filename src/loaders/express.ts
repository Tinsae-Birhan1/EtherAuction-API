import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import passport from 'passport';
import { xss } from 'express-xss-sanitizer';
import mongoSanitize from 'express-mongo-sanitize';
import authRouter from '../routes/auth.route';
import ApiError from '../utils/ApiError';
import { jwtStrategy } from '../config/passport';

export default async function setup(app: Application): Promise<Application> {
  app.use(passport.initialize());
  passport.use('jwt', jwtStrategy);

  app.use(express.json());

  app.use(xss());
 
  app.use(mongoSanitize());

 

  app.use(authRouter);
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  });


  return app;
}

