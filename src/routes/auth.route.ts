import express from 'express';
import { RequestHandler } from 'express';
import validate from '../middlewares/validate';
import { userValidation, authValidation } from '../validations';
import { authController } from '../controllers';

const router = express.Router();

router.post(
  '/auth/register',
  validate(userValidation),
  authController.register as RequestHandler,
);

router.post(
  '/auth/login',
  validate(authValidation.loginSchema),
  authController.login as RequestHandler,
);

router.post(
  '/auth/refresh-token',
  validate(authValidation.refreshTokenSchema),
  authController.refreshToken as RequestHandler,
);

router.post(
  '/auth/logout', 
  authController.logout as RequestHandler, 
);
export default router;
