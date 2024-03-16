import httpStatus from 'http-status';
import { User } from '../models';
import ApiError from '../utils/ApiError';
import EventEmitter from '../utils/EventEmitter';

const createUser = async (userBody: any): Promise<any> => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken');
  }
  const user = await User.create(userBody);
  EventEmitter.emit('signup', user);
  return user;
};

const getUserByEmail = async (email: string): Promise<any> => {
  const user = await User.findOne({ email });
  return user;
};

const getUserById = async (id: string): Promise<any> => {
  const user = await User.findById(id);
  return user;
};

const userService = {
  createUser,
  getUserByEmail,
  getUserById,
};

export default userService;
