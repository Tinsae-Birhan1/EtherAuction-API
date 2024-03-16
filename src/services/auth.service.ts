import userService from './user.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

const login = async (email: string, password: string, ipAddr: string) => {
  const user = await userService.getUserByEmail(email);

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  return user;
};


  
const authService = {
  login,
  
};
  
export default authService;
