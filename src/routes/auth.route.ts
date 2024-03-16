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

router.post(
  '/auth/refresh-token',
  authController.refreshToken as RequestHandler,
);

router.post(
  '/auth/logout', 
  authController.logout as RequestHandler, 
);
export default router;
