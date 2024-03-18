import userService from '../../src/services/user.service';
import User from '../../src/models/user.model';

jest.mock('../../src/models/user.model');

describe('User Service', () => {
  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com', password: 'password' };
      (User.isEmailTaken as jest.Mock).mockResolvedValueOnce(false);
      (User.create as jest.Mock).mockResolvedValueOnce(userData);

      const user = await userService.createUser(userData);
      expect(user).toEqual(userData);
    });

    it('should throw error if email is already taken', async () => {
      (User.isEmailTaken as jest.Mock).mockResolvedValueOnce(true);

      await expect(userService.createUser({ email: 'john@example.com' })).rejects.toThrowError('Email is already taken');
    });
  });

  describe('getUserByEmail', () => {
    it('should return user by email', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com', password: 'password' };
      (User.findOne as jest.Mock).mockResolvedValueOnce(userData);

      const user = await userService.getUserByEmail('john@example.com');
      expect(user).toEqual(userData);
    });

    it('should return null if user not found', async () => {
      (User.findOne as jest.Mock).mockResolvedValueOnce(null);

      const user = await userService.getUserByEmail('nonexistent@example.com');
      expect(user).toBeNull();
    });
  });

  describe('getUserById', () => {
    it('should return user by ID', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com', password: 'password' };
      (User.findById as jest.Mock).mockResolvedValueOnce(userData);

      const user = await userService.getUserById('123');
      expect(user).toEqual(userData);
    });

    it('should return null if user not found', async () => {
      (User.findById as jest.Mock).mockResolvedValueOnce(null);

      const user = await userService.getUserById('nonexistent_id');
      expect(user).toBeNull();
    });
  });
});
