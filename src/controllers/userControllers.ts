import { Request, Response, NextFunction } from "express";
import {
  createUser,
  findUserByEmail,
  getAllUsers,
  generateToken,
} from "../services/userServices";
import bcrypt from "bcryptjs";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ name, email, password: hashedPassword });

    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user || !(await user.comparePassword(password))) {
    res.status(400).json({ message: "Invalid email or password" });
    return;
  }

  const token = generateToken(user);
  res.status(200).json({ token });
};

export const allUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const users = await getAllUsers();
  res.status(200).json(users);
};


