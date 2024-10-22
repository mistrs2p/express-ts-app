/// <reference path="../types/express.d.ts" />

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { errorResponse } from "../utils/responseFormatter";


export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return errorResponse(res, "No token provided", 401);
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as
      | string
      | JwtPayload;
    if (!decoded) {
      throw new Error("Invalid token");
    }
    req.user = decoded; // why I need this
    next();
  } catch (error) {
    return errorResponse(res, error as string, 401);
  }
};
