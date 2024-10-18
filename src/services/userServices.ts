import User, { IUser,CreateUserDTO } from '../models/User';
import jwt from 'jsonwebtoken';

export const createUser = async (userData: CreateUserDTO) => {
  const newUser = new User(userData);
  return await newUser.save();
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};

export const getAllUsers = async (): Promise<IUser[] | null> => {
  return await User.find().select('-password');
};

export const generateToken = (user: IUser): string => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};