import express from 'express';
import { RequestHandler } from 'express';
import { authController } from '../controllers';

const router = express.Router();

router.post(
  '/auth/register',
  authController.register as RequestHandler,
);

router.post(
  '/auth/login',
  authController.login as RequestHandler,
);


export default router;
