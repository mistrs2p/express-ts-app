import { Request, Response, NextFunction } from "express";
import {
  createUser,
  findUserByEmail,
  getAllUsers,
  generateToken,
} from "../services/userServices";
import bcrypt from "bcryptjs";
import { successResponse, errorResponse } from "../utils/responseFormatter";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return errorResponse(res, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ name, email, password: hashedPassword });

    const token = generateToken(newUser);
    return successResponse(res, { token }, 201);
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
    return errorResponse(res, "Invalid email or password", 400);
  }

  const token = generateToken(user);
  return successResponse(res, { token });
};

export const allUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await getAllUsers();
    // if ('user' in req) {
    //   console.log(req.user)
    // }
    // console.log(req)
    return successResponse(res, users);
  } catch (error: Error | any) {
    next(error);
    // res.status(400).json({ message: "req.user not provided" });
  }
};
