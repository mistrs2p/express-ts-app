import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { errorResponse } from "../utils/responseFormatter";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Error: ${err.message}`)
  res.status(500).json({ message: err.message });
  // return errorResponse(res, { message: err.message }, 500)
};
