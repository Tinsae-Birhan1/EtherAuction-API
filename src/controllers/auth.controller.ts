import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { userService, tokenService, authService } from '../services';

const register = catchAsync(async (req: Request, res: Response) => {

  const user = await userService.createUser(req.body);
  // generate token
  const tokens = await tokenService.generateAuthTokens(user.id);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.login(
    email,
    password,
    req.connection.remoteAddress,
  );
  // generate token
  const tokens = await tokenService.generateAuthTokens(user.id);
  res.status(httpStatus.OK).send({ user, tokens });
});

const refreshToken = catchAsync(async (req, res) => {
    const tokens = await authService.refreshAuthToken(req.body.refreshToken);
    res.status(httpStatus.OK).send({ ...tokens });
  });
  
  const logout = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    await tokenService.blacklistToken(refreshToken);
    res.status(httpStatus.OK).send({ message: 'Logged out successfully' });
  });


const authController = {
    register,
    login,
    refreshToken,
    logout,
  };
  
  export default authController;
  