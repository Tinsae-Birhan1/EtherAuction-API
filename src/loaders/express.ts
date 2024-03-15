import express, { Express } from 'express';
import mongoSanitize from 'express-mongo-sanitize';

const configureApp = async (app: Express): Promise<Express> => {
  app.use(express.json());
  app.use(mongoSanitize());
  return app;
};

export default configureApp;
