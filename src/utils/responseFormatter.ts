import { Response } from 'express';

export const successResponse = <T>(res: Response, data: T) => {
  res.status(200).json({ success: true, data });
};

export const errorResponse = (res: Response, message: string, status = 400) => {
  res.status(status).json({ success: false, message });
};
