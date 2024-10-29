import { Request, Response, NextFunction } from "express";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { errorResponse } from "../utils/responseFormatter";

const ajv = new Ajv();
addFormats(ajv); // Adds format validation, like "email" and "date-time"

export const validateSchema = (schema: object) => {
  const validate = ajv.compile(schema);

  return (req: Request, res: Response, next: NextFunction) => {
    const valid = validate(req.body);
    if (!valid) {
      const errors = validate.errors?.map((err) => `${err.instancePath} ${err.message}`).join(", ");
      return errorResponse(res, `Validation error: ${errors}`, 400);
    }
    next();
  };
};