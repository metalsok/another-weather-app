import { UserModel } from './userModel';

export const UserService = {
  async register(email, password) {
    const userExists = await UserModel.findUserByEmail(email);
    if (userExists) {
      throw new Error('User already exists');
    }
    return UserModel.createUser(email, password);
  },
  async login(email) {
    return UserModel.findUserByEmail(email);
  },
};
