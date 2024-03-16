import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { userService, tokenService } from '../services';

const register = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user.id);
  res.status(httpStatus.CREATED).send({ user, tokens });
});





const authController = {
    register,
    
  };
  
  export default authController;
  