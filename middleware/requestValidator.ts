import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import ErrorResponse from "../utils/errorResponse";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const msg = errors.array().map(e => e.msg).join(", ") || "Validation Failed";

    return next(new ErrorResponse(msg, 400));
  }

  next();
}

export default validateRequest;
