import userService from './user.service';
import tokenService from './token.service';
import ApiError from '../utils/ApiError';
import { tokenTypes } from '../config/tokens';
import httpStatus from 'http-status';

const login = async (email: string, password: string, ipAddr: string) => {
  const user = await userService.getUserByEmail(email);

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  return user;
};

const refreshAuthToken = async (refreshToken: string) => {
    try {
      const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
      
      const userId = refreshTokenDoc.user.toString();
      
      const user = await userService.getUserById(userId);
      
      if (!user) {
        throw new Error();
      }
      
      await refreshTokenDoc.deleteOne();
      return tokenService.generateAuthTokens(userId);
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }
  };
  
  
const authService = {
  login,
  refreshAuthToken,
};
  
export default authService;
