import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { errorResponse } from "../utils/responseFormatter";
import logger from "../utils/logger";

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
    if ("user" in req) {
      req.user = decoded;
      logger.info(req.user);
    }
    // console.log(req.user);
    next();

    // const decoded = jwt.verify(token, process.env.JWT_SECRET!) as string | JwtPayload;
    // req.user = decoded;
    // next();
  } catch (error) {
    return errorResponse(res, error as string, 401);
  }
};
