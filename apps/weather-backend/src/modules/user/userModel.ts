import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/dbConfig';
import bcrypt from 'bcryptjs';

interface IUser {
  email: string;
  password: string;
}

export class UserModel extends Model implements IUser {
  public email!: string; // Using TypeScript's non-null assertion operator
  public password!: string;

  static async createUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.create({ email, password: hashedPassword });
  }

  static async findUserByEmail(email) {
    const userInstance = await this.findOne({ where: { email } });
    return userInstance ? (userInstance.get() as IUser) : null;
  }
}

UserModel.init(
  {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  { sequelize, modelName: 'user' }
);
