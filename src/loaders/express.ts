import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import passport from 'passport';
import { xss } from 'express-xss-sanitizer';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import authRouter from '../routes/auth.route';
import {AuctionRoutes} from '../routes/auction.routes';
import { errorHandler, errorConverter } from '../middlewares/error';
import ApiError from '../utils/ApiError';
import { jwtStrategy } from '../config/passport';
import { cspOptions, NODE_ENV } from '../config/config';

export default async function setup(app: Application): Promise<Application> {
  app.use(passport.initialize());
  passport.use('jwt', jwtStrategy);

  app.use(express.json());

  app.use(xss());
  app.use(
    helmet({
      contentSecurityPolicy: cspOptions,
    }),
  );
  app.use(mongoSanitize());

  if (NODE_ENV === 'production') {
    app.use(cors({ origin: 'url' }));
    app.options('*', cors({ origin: 'url' }));
  } else {
    app.use(cors());
    app.options('*', cors());
  }

  app.use(authRouter);
  const auctionRoutes = new AuctionRoutes();
  app.use(auctionRoutes.router);
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  });

  app.use(errorConverter);
  app.use(errorHandler);
  return app;
}